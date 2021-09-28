export default class FormValidator {
  constructor(config, form) {
      this._config = config;
      this._form = form;
  }

  _showError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._config.inputErrorClass);
    error.textContent = input.validationMessage;
    error.classList.add(this._config.errorClass);
  }
  
  _hideError(input){
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._config.inputErrorClass);
    error.textContent ='';
    error.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(input){
    if(!input.validity.valid) {
      this._showError(input);
    }
    else {
      this._hideError(input);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;});
  };

  _toggleButtonState(button, isActive) {
    if(!isActive) {
      button.classList.add(this._config.inactiveButtonClass);
      button.disabled = true;
    }
    else {
      button.classList.remove(this._config.inactiveButtonClass);
      button.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const button = this._form.querySelector(this._config.submitButtonSelector);
    const self = this;
    inputList.forEach(function(input) {
      input.addEventListener('input', function() {
        self._checkInputValidity(input);
        self._toggleButtonState(button, !self._hasInvalidInput(inputList));
      });
    });
  }
  
  enableValidation() {
      this._form.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
  }

  resetErrorFields() {
    const inputList = this._form.querySelectorAll('.popup__input');
    inputList.forEach((input) => {
      const error = this._form.querySelector(`#${input.id}-error`);
      input.classList.remove(this._config.inputErrorClass);
      error.textContent ='';
      error.classList.remove(this._config.errorClass);
    });
    this._form.reset();
  }
}