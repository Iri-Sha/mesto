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
const formElementCard = document.querySelector('.popup__form_card');
const popupZoomImage = document.querySelector('.popup_view-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupProfileButton = document.querySelector('.popup__button_profile');
const popupCardButton = document.querySelector('.popup__button_new-card');
const inputs = document.querySelectorAll('.popup__input');
const errors = document.querySelectorAll('.popup__error');

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
  clearError();
  openPopup(popupProfileEdit);
});

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  nameInputChange.textContent = nameInput.value;
  jobInputChange.textContent = jobInput.value;
  closePopup(popupProfileEdit);
};

formElementProfile.addEventListener('submit', handleProfileFormSubmit);

//Лайк карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_active')
};

//Удаление карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

//Открытие картинки
function openImagePopup(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openPopup(popupZoomImage);
}

//Создает карточку и возвращает с уже установленными обработчиками
function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonDelete = cardElement.querySelector('.card__delete-button');

  cardTitle.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;

  buttonLike.addEventListener('click', likeCard);
  buttonDelete.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => openImagePopup(item));

  return cardElement;
};

//Инициализация карточек при загрузке страницы
function renderCards(item) {
  const cardElement = createCard(item);
  elementsCards.append(cardElement);
};

function render() {
  initialCards.forEach(renderCards);
};

render();

//Добавление новой карточки
function addNewCard(evt) {
  const newCardElement = createCard(evt);
  elementsCards.prepend(newCardElement);
};

profileOpenAddButton.addEventListener('click', function() {
  formElementCard.reset();
  clearError();
  disabledButton();

  popupMestoName.textContent = popupMestoName.value;
  popupMestoLink.textContent = popupMestoLink.value;

  openPopup(popupAddCard);
});

function handleNewCardFormSubmit (evt) {
  evt.preventDefault();
  const item = {
    name: popupMestoName.value,
    link: popupMestoLink.value
  }
  addNewCard(item);
  closePopup(popupAddCard);
  formElementCard.reset();
};

formElementCard.addEventListener('submit', handleNewCardFormSubmit)
