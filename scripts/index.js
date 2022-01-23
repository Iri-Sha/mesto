let LikeButton = document.querySelectorAll('.card__like-button')
let profileOpenEditButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let formElement = popup.querySelector('.popup__container')
let popupCloseButton = formElement.querySelector('.popup__close')
let nameInput = formElement.querySelector('.popup__field_profile_name')
let jobInput = formElement.querySelector('.popup__field_profile_about-me')
let nameInputChange = document.querySelector('.profile__name')
let jobInputChange = document.querySelector('.profile__about-me')

LikeButton.forEach(item => item.addEventListener('click', function(){
  item.classList.toggle('card__like-button_active')
}))

function openPopup() {
  popup.classList.add('popup_opened')
  nameInput.value = nameInputChange.textContent;
  jobInput.value = jobInputChange.textContent;
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
  nameInputChange.textContent = nameInput.value;
  jobInputChange.textContent = jobInput.value;
  closePopup();
};

formElement.addEventListener('submit', formSubmitHandler);
