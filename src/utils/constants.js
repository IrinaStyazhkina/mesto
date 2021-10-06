export const profileEditButton = document.querySelector('.profile__edit-btn');
export const addPhotoButton = document.querySelector('.profile__add-btn');
export const avatarEditButton = document.querySelector('.profile__edit-pen');

export const editPopup = document.querySelector('.popup_type_edit-profile');
export const editProfileForm = editPopup.querySelector('.popup__form');
export const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
export const editAvatarForm = editAvatarPopup.querySelector('.popup__form');
export const nameInput = editPopup.querySelector('#popup__input_content_name');
export const activityInput = editPopup.querySelector('#popup__input_content_activity');
export const avatarInput = editAvatarPopup.querySelector('#popup__input_content_avatar');
export const addPopup = document.querySelector('.popup_type_add-photo');
export const addPhotoForm = addPopup.querySelector('.popup__form');

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  closeButtonSelector:'.popup__close-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' 
}; 

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-28',
  token: '293a0c2f-5c40-49bf-a976-5ae5443f2d33',
  userId: 'f16a34b5394cfefae4df8840'
}
