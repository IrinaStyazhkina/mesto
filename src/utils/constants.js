export const profileEditButton = document.querySelector('.profile__edit-btn');
export const addPhotoButton = document.querySelector('.profile__add-btn');

export const editPopup = document.querySelector('.popup_type_edit-profile');
export const editProfileForm = editPopup.querySelector('.popup__form');
export const nameInput = editPopup.querySelector('#popup__input_content_name');
export const activityInput = editPopup.querySelector('#popup__input_content_activity');
export const editProfileSaveBtn = editPopup.querySelector('.popup__save-btn');
export const addPopup = document.querySelector('.popup_type_add-photo');
export const addPhotoForm = addPopup.querySelector('.popup__form');
export const addPhotoSaveBtn = addPhotoForm.querySelector('.popup__save-btn');

export const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  closeButtonSelector:'.popup__close-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' 
}; 
