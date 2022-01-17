let LikeButton = document.querySelectorAll('.card__like-button')
let profileOpenEditButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let formElement = popup.querySelector('.popup__container')
let popupCloseButton = formElement.querySelector('.popup__close')
let nameInput = formElement.querySelector('.popup__name')
let jobInput = formElement.querySelector('.popup__about-me')
let popupButtonSave = formElement.querySelector('.popup__save')

LikeButton.forEach(item => item.addEventListener('click', function(){
  item.classList.toggle('card__like-button_active')
}))

function openPopup() {
  popup.classList.add('popup_opened')
};

function closePopup() {
  popup.classList.remove('popup_opened')
};

profileOpenEditButton.addEventListener('click', openPopup);

popupCloseButton.addEventListener('click', closePopup);

popup.addEventListener('click', function(event) {
  if(event.target === event.currentTarget) {
    closePopup()
  }
});

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameInput.textContent = nameInput.value;
  jobInput.textContent = jobInput.value;
  let nameInputChange = document.querySelector('.profile__name');
  let jobInputChange = document.querySelector('.profile__about-me');
  nameInputChange.textContent = nameInput.value;
  jobInputChange.textContent = jobInput.value;
  popupButtonSave.addEventListener('click', closePopup);
};

formElement.addEventListener('submit', formSubmitHandler);
