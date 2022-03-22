export class FormValidator {
    constructor(settings, formElement) {
        this._formElement = formElement; this._form
        this._settings = settings;
        this.inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        this.buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    }

    _hasInvalidInput() {
        return this.inputList.some((inputElement) => {
          return !inputElement.validity.valid
        })
    };

    toggleButtonState() {
        const { inactiveButtonClass } = this._settings;

        if (this._hasInvalidInput()) {
          this.buttonElement.classList.add(inactiveButtonClass);
          this.buttonElement.disabled = true;
        } else {
          this.buttonElement.classList.remove(inactiveButtonClass);
          this.buttonElement.disabled = false;
        }
    };

    _showInputError(inputElement, errorMessage) {
        const { inputErrorClass, errorClass } = this._settings;

        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    };

    _hideInputError(inputElement) {
        const { inputErrorClass, errorClass } = this._settings;

        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
        } else {
          this._hideInputError(inputElement);
        }
    };

    _setEventListeners() {
        this.toggleButtonState();
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this.toggleButtonState();
          });
        });
    };

    enableValidation() {
        this._formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
      
        this._setEventListeners();
    };

    clearError() {
        this.inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };
}