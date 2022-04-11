export class Card {
    constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._cardTemplate = document.querySelector(cardTemplateSelector)
            .content.querySelector('.card');
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    _setEventListeners() {
        this._buttonDelete = this._cardElement.querySelector('.card__delete-button');

        this._buttonLike.addEventListener('click', () => this._handleLikeClick(this._id));
        this._buttonDelete.addEventListener('click', () => this._handleDeleteClick(this._id));
        this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)

        return userHasLikedCard
    }

    _dislikeCard() {
        this._buttonLike.classList.remove('card__like-button_active')
    }

    _likeCard() {
        this._buttonLike.classList.add('card__like-button_active')
    };

    deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    };

    setLikes(newLikes) {
        this._likes = newLikes
        this._likeCountElement.textContent = this._likes.length

        if(this.isLiked()) {
            this._likeCard()
        } else {
            this._dislikeCard()
        }
    }

    createCard() {
        this._cardElement = this._cardTemplate.cloneNode(true);
        this._cardImage = this._cardElement.querySelector('.card__image');
        this._cardTitle = this._cardElement.querySelector('.card__title');
        this._buttonLike = this._cardElement.querySelector('.card__like-button');
        this._likeCountElement = this._cardElement.querySelector('.card__like-count');


        this._cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
      
        this._setEventListeners();

        this.setLikes(this._likes);

        if(this._ownerId !== this._userId) {
            this._buttonDelete.style.display = 'none'
        }

        return this._cardElement;
      };
}