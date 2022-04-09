import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form')
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._popupButton = this._popupForm.querySelector('.popup__button');
        this._popupButtonTextContent = this._popupButton.textContent;
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleFormSubmit = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    renderLoading(isLoading) {
        if (isLoading) {
          this._popupButton.textContent = 'Сохранение...';
        } else {
          this._popupButton.textContent = this._popupButtonTextContent;
        }
    }
}