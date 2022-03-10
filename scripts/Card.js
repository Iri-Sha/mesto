export class Card {
    constructor(data, cardTemplateSelector, openImagePopup) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content;
        this._name = data.name;
        this._link = data.link;
        this._openImagePopup = openImagePopup;
    }

    _setEventListeners() {
        this._buttonDelete = this._cardElement.querySelector('.card__delete-button');

        this._buttonLike.addEventListener('click', this._likeCard);
        this._buttonDelete.addEventListener('click', this._deleteCard);
        this._cardImage.addEventListener('click', () => this._openImagePopup(this._name, this._link));
    }

    _likeCard = () => {
        this._buttonLike.classList.toggle('card__like-button_active')
    };

    _deleteCard = () => {
        this._buttonDelete.closest('.card').remove();
    };

    createCard() {
        this._cardElement = this._cardTemplate.cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.card__image');
        const cardTitle = this._cardElement.querySelector('.card__title');
        this._buttonLike = this._cardElement.querySelector('.card__like-button');

        cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
      
        this._setEventListeners();

        return this._cardElement;
      };
}