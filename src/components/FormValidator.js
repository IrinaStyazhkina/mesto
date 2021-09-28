export default class FormValidator {
  constructor(config, form) {
      this._config = config;
      this._form = form;
      this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
      this._button = this._form.querySelector(this._config.submitButtonSelector);
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

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;});
  };

  _toggleButtonState(isActive) {
    if(!isActive) {
      this._button.classList.add(this._config.inactiveButtonClass);
      this._button.disabled = true;
    }
    else {
      this._button.classList.remove(this._config.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    const self = this;
    this._inputList.forEach(function(input) {
      input.addEventListener('input', function() {
        self._checkInputValidity(input);
        self._toggleButtonState(!self._hasInvalidInput());
      });
    });
  }
  
  enableValidation() {
      this._form.addEventListener('submit', function(evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
  }

  resetValidation(isSubmitButtonActiveByDefault) {
    this._toggleButtonState(isSubmitButtonActiveByDefault);
    this._inputList.forEach((input) => {
      this._hideError(input);
    });
    this._form.reset();
  }
}