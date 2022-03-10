import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

const profileOpenEditButton = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const formElementProfile = popupProfileEdit.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_about-me');
const nameInputChange = document.querySelector('.profile__name');
const jobInputChange = document.querySelector('.profile__about-me');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardTemplate = document.querySelector('#card-template').content;
const elementsCards = document.querySelector('.elements__cards');
const profileOpenAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_card-add');
const popupMestoName = popupAddCard.querySelector('.popup__input_mesto_name');
const popupMestoLink = popupAddCard.querySelector('.popup__input_mesto_link');
const formEditProfile = document.querySelector('.popup__form_profile');
const formElementCard = document.querySelector('.popup__form_card');
const popupZoomImage = document.querySelector('.popup_view-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupProfileButton = document.querySelector('.popup__button_profile');
const popupCardButton = document.querySelector('.popup__button_new-card');
const inputs = document.querySelectorAll('.popup__input');
const errors = document.querySelectorAll('.popup__error');
const buttonElement = document.querySelector('.popup__button');
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editProfileValidator = new FormValidator(config, formEditProfile);
const addCardValidator = new FormValidator(config, formElementCard);

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

function openPopup(elem) {
  elem.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
};

function closePopup(elem) {
  elem.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
};

//Закрытие попапов по клику на оверлей и крестик
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

//Закрытие попапов по клику на Esc
const closePopupEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//Редактирование профиля
profileOpenEditButton.addEventListener('click', function() {
  nameInput.value = nameInputChange.textContent;
  jobInput.value = jobInputChange.textContent;
  editProfileValidator.clearError();
  openPopup(popupProfileEdit);
});

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameInputChange.textContent = nameInput.value;
  jobInputChange.textContent = jobInput.value;
  closePopup(popupProfileEdit);
};

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//Открытие картинки
const openImagePopup = (title, link) => {
  popupImage.src = link;
  popupImage.alt = title;
  popupCaption.textContent = title;

  openPopup(popupZoomImage);
}

//Инициализация карточек при загрузке страницы
function renderCards(data) {
  const card = new Card(data,'#card-template', openImagePopup);
  const cardElement = card.createCard();
  elementsCards.append(cardElement);
};

function render() {
  initialCards.forEach(renderCards);
};

render();

//Добавление новой карточки
function addNewCard(data) {
  const card = new Card(data,'#card-template', openImagePopup);
  const newCardElement = card.createCard();
  elementsCards.prepend(newCardElement);
};

profileOpenAddButton.addEventListener('click', function() {
  formElementCard.reset();
  addCardValidator.clearError();
  addCardValidator.toggleButtonState();

  popupMestoName.textContent = popupMestoName.value;
  popupMestoLink.textContent = popupMestoLink.value;

  openPopup(popupAddCard);
});

function handleNewCardFormSubmit (evt) {
  evt.preventDefault();
  const data = {
    name: popupMestoName.value,
    link: popupMestoLink.value
  }
  
  addNewCard(data);
  closePopup(popupAddCard);
  formElementCard.reset();
};

formElementCard.addEventListener('submit', handleNewCardFormSubmit)
