import './index.css';

import {
  initialCards,
  config,
  profileOpenEditButton,
  nameInput,
  jobInput,
  profileOpenAddButton,
  formEditProfile,
  formElementCard
} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const validatorEditProfile = new FormValidator(config, formEditProfile);
const validatorAddCard = new FormValidator(config, formElementCard);

validatorEditProfile.enableValidation();
validatorAddCard.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about-me');

const popupProfileEdit = new PopupWithForm('.popup_profile-edit',  
  {
  handleFormSubmit: (data) => { 
    userInfo.setUserInfo({ name: data['profileName'], job: data['profileAbout'] });
    popupProfileEdit.close();
  }}
)

popupProfileEdit.setEventListeners();

//Редактирование профиля
profileOpenEditButton.addEventListener('click', function() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name; 
  jobInput.value = userData.job;
  validatorEditProfile.clearError();
  popupProfileEdit.open();
});

const popupZoomImage = new PopupWithImage('.popup_view-image') 

popupZoomImage.setEventListeners();

//Открытие картинки
function handleCardClick(name, link) {
  popupZoomImage.open(name, link);
}

function renderCards(data) {
  const card = new Card(data,'#card-template', handleCardClick);
  return card.createCard();
};

//Отрисовка карточек при загрузке страницы
const cards = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    cards.addItem(renderCards(item))
  }},  
  '.elements__cards'
);

cards.renderItems();

const popupAddCard = new PopupWithForm('.popup_card-add',  
  {
  handleFormSubmit: (data) => {
    const newCard = renderCards({ name: data['mestoName'], link: data['mestoLink'] });
    
    cards.addItem(newCard);
    popupAddCard.close();
    formElementCard.reset();
  }}
)

popupAddCard.setEventListeners();

profileOpenAddButton.addEventListener('click', function() {
  formElementCard.reset();
  validatorAddCard.clearError();
  validatorAddCard.toggleButtonState();

  popupAddCard.open();
});