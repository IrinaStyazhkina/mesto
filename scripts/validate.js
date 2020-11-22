const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  closeButtonSelector:'.popup__close-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' 
}; 

const showError = (form, input, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = input.validationMessage;
  error.classList.add(config.errorClass);
}

const hideError = (form, input, config) => {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.textContent ='';
  error.classList.remove(config.errorClass);
}

const checkInputValidity = (form, input, config) => {
  if(!input.validity.valid) {
    showError(form, input, config);
  }
  else {
    hideError(form, input, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (button, isActive, config) => {
  if(!isActive) {
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
  else {
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  const closeBtn = form.querySelector(config.closeButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener('input', function() {
      checkInputValidity(form, input, config);
      toggleButtonState(button, !hasInvalidInput(inputList), config);
    });
  });
  // closeBtn.addEventListener('click', function() {
  //   inputList.forEach((input) => {
  //     hideError(form, input, config);
  //   })
  // })
  // document.addEventListener('keydown', (evt) => {
  //   if(evt.key==='Escape') {
  //     inputList.forEach((input) => {
  //       hideError(form, input, config);
  //     });
  //   }
  // });
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', function(evt) {
      evt.preventDefault();
    });  
    setEventListeners(form, config); 
  });
}

enableValidation(validationConfig);









