import "core-js/stable";
import "regenerator-runtime/runtime";
import './index.css';

import {
  config,
  profileOpenEditButton,
  nameInput,
  aboutInput,
  profileOpenAddButton,
  formEditProfile,
  formElementCard,
  formEditAvatar,
  avatarOpenEdit
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import { api } from '../components/Api.js';

let userId

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cardList]) => {
    userInfo.setUserInfo(userData)
    userId = userData._id

    cardList.forEach(data => {
      const card = renderCards({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      })
      cards.addItem(card)
    })
  })
  .catch((err) => {
    console.log(err);
});

const validatorEditProfile = new FormValidator(config, formEditProfile);
const validatorAddCard = new FormValidator(config, formElementCard);
const validatorEditAvatar = new FormValidator(config, formEditAvatar);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();
validatorEditAvatar.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about-me', '.profile__avatar');

const popupProfileEdit = new PopupWithForm('.popup_profile-edit',  
  {
  handleFormSubmit: (data) => {
    popupProfileEdit.renderLoading(true);
    api.editProfile(data.profileName, data.profileAbout)
      .then(res => {
        userInfo.setUserInfo(res);
        popupProfileEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupProfileEdit.renderLoading(false))
  }}
)

popupProfileEdit.setEventListeners();

//Редактирование профиля
profileOpenEditButton.addEventListener('click', function() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name; 
  aboutInput.value = userData.about;
  validatorEditProfile.clearError();
  popupProfileEdit.open();
});

const popupAvatarEdit = new PopupWithForm('.popup_avatar-edit',  
  {
  handleFormSubmit: (data) => {
    popupAvatarEdit.renderLoading(true);
    api.editAvatar(data.avatarLink)
      .then(res => {
        userInfo.setUserInfo(res);
        popupAvatarEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAvatarEdit.renderLoading(false))
  }}
)

popupAvatarEdit.setEventListeners();

//Редактирование аватара
avatarOpenEdit.addEventListener('click', function() {
  validatorEditAvatar.clearError();
  popupAvatarEdit.open();
});

const popupZoomImage = new PopupWithImage('.popup_view-image') 

popupZoomImage.setEventListeners();

//Открытие картинки
function handleCardClick(name, link) {
  popupZoomImage.open(name, link);
}

function renderCards(data) {
  const card = new Card(
    data,
    '#card-template',
    handleCardClick,
    (id) => {
      popupConfirmDelete.open();
      popupConfirmDelete.submitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.deleteCard();
            popupConfirmDelete.close();
          })
      })
    },
    (id) => {
      if(card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err);
        })
      } else {
          api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch((err) => {
            console.log(err);
        })
      }
    },
  );
  return card.createCard();
};

//Отрисовка карточек при загрузке страницы
const cards = new Section({ 
  items: [], 
  renderer: (item) => {
    cards.addItem(renderCards(item))
  }},  
  '.elements__cards'
);

cards.renderItems();

const popupAddCard = new PopupWithForm('.popup_card-add',  
  {
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true);
    api.addCard({
      name: data.mestoName,
      link: data.mestoLink
    })
      .then(res => {
        const newCard = renderCards({
          name: res.name,
          link: res.link,
          likes: res.likes,
          id: res._id,
          userId: userId,
          ownerId: res.owner._id
        });
        cards.addItem(newCard);
        popupAddCard.close();
        formElementCard.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAvatarEdit.renderLoading(false))
  }}
)

popupAddCard.setEventListeners();

profileOpenAddButton.addEventListener('click', function() {
  formElementCard.reset();
  validatorAddCard.clearError();
  validatorAddCard.toggleButtonState();

  popupAddCard.open();
});

const popupConfirmDelete = new PopupWithConfirmation('.popup_confirm-delete')

popupConfirmDelete.setEventListeners();