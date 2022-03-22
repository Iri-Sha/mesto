import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, { handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupSelector.querySelector('.popup__form')
    }

    _getInputValues() {
        this._inputList = this._popupForm.querySelectorAll('.popup__input');

        this._inputValues = {};
        this._inputList.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', this._formSubmit)
    }

    close() {
        super.close();
        this._popupForm.removeEventListener('submit', this._formSubmit);
        this._popupForm.reset();
    }

    _formSubmit = (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
    }
}