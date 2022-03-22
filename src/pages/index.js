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

const editProfileValidator = new FormValidator(config, formEditProfile);
const addCardValidator = new FormValidator(config, formElementCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__about-me');

const popupProfileEdit = new PopupWithForm('.popup_profile-edit',  
  {
  handleFormSubmit: (data) => { 
    userInfo.setUserInfo({ name: data['profileName'], job: data['profileAbout'] });
    popupProfileEdit.close();
  }})

//Редактирование профиля
profileOpenEditButton.addEventListener('click', function() {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  editProfileValidator.clearError();
  popupProfileEdit.open();
});

const popupZoomImage = new PopupWithImage('.popup_view-image') 

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

profileOpenAddButton.addEventListener('click', function() {
  formElementCard.reset();
  addCardValidator.clearError();
  addCardValidator.toggleButtonState();

  popupAddCard.open();
});