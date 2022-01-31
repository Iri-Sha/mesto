const profileOpenEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelectorAll('.popup');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const formElement = document.querySelector('.popup__container');
const popupButtonCloseProfileEdit = document.querySelector('.popup__close_profile-edit');
const nameInput = document.querySelector('.popup__field_profile_name');
const jobInput = document.querySelector('.popup__field_profile_about-me');
const nameInputChange = document.querySelector('.profile__name');
const jobInputChange = document.querySelector('.profile__about-me');

function openPopup(elem) {
  elem.classList.add('popup_opened');
};

function closePopup(elem) {
  elem.classList.remove('popup_opened');
};

profileOpenEditButton.addEventListener('click', function() {
  openPopup(popupProfileEdit);
  nameInput.value = nameInputChange.textContent;
  jobInput.value = jobInputChange.textContent;
});

popupButtonCloseProfileEdit.addEventListener('click', function() {
  closePopup(popupProfileEdit);
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInputChange.textContent = nameInput.value;
  jobInputChange.textContent = jobInput.value;
  closePopup(popupProfileEdit);
};

formElement.addEventListener('submit', formSubmitHandler);

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
const ElementsCards = document.querySelector('.elements__cards');
const profileOpenAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_card-add');
const PopupButtonCloseCardAdd = document.querySelector('.popup__close_card-add');
const PopupMestoName = document.querySelector('.popup__field_mesto_name');
const PopupMestoLink = document.querySelector('.popup__field_mesto_link');
const addButton = document.querySelector('.profile__add-button');
const ButtonDeleteCard = document.querySelector('.card__delete-button');
const FormElementCard = document.querySelector('.popup__container_add-card');
const popupZoomImage = document.querySelector('.popup_view-image');
const PopupButtonCloseImage = document.querySelector('.popup__close_image');
const cardTitle = document.querySelector('.card__title');

//Лайк карточки
function LikeCard(evt) {
  evt.querySelector('.card__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_active');
  });
};

//Удаление карточки
function DeleteCard(evt) {
  evt.querySelector('.card__delete-button').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
};

function renderCards(evt) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.card__title').textContent = evt.name;
  cardElement.querySelector('.card__image').src = evt.link;
  cardElement.querySelector('.card__image').alt = evt.name;

  LikeCard(cardElement);
  DeleteCard(cardElement);
  cardElement.querySelector('.card__image').addEventListener('click', ImageZoom);

  ElementsCards.append(cardElement);
};

function render() {
  initialCards.forEach(renderCards);
};

render();

function AddNewCard() {
  const NewCardElement = cardTemplate.cloneNode(true);

  NewCardElement.querySelector('.card__title').textContent = PopupMestoName.value;
  NewCardElement.querySelector('.card__image').src = PopupMestoLink.value;
  NewCardElement.querySelector('.card__image').alt = PopupMestoName.value;

  LikeCard(NewCardElement);
  DeleteCard(NewCardElement);
  NewCardElement.querySelector('.card__image').addEventListener('click', ImageZoom);

  ElementsCards.prepend(NewCardElement);
  FormElementCard.reset ();
};

profileOpenAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
  PopupMestoName.textContent = PopupMestoName.value;
  PopupMestoLink.textContent = PopupMestoLink.value;
});

PopupButtonCloseCardAdd.addEventListener('click', function() {
  closePopup(popupAddCard);
});

function formSubmitHandlerNewCard (evt) {
  evt.preventDefault();
  AddNewCard(PopupMestoName.value, PopupMestoLink.value);
  closePopup(popupAddCard);
};

FormElementCard.addEventListener('submit', formSubmitHandlerNewCard);

function ImageZoom(evt) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = popupImage.alt;

  openPopup(popupZoomImage);
};

PopupButtonCloseImage.addEventListener('click', function() {
  closePopup(popupZoomImage);
});

popupProfileEdit.addEventListener('click', function(event) {
  if(event.target === event.currentTarget) {
    closePopup(popupProfileEdit);
  }
});

popupAddCard.addEventListener('click', function(event) {
  if(event.target === event.currentTarget) {
    closePopup(popupAddCard);
  }
});

popupZoomImage.addEventListener('click', function(event) {
  if(event.target === event.currentTarget) {
    closePopup(popupZoomImage);
  }
});
