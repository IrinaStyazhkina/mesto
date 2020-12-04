import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const profileEditButton = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const addPhotoButton = document.querySelector('.profile__add-btn');

const popupList = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const editProfileClosePopupBtn = editProfileForm.querySelector('.popup__close-btn');
const nameInput = editProfileForm.querySelector('#popup__input_content_name');
const activityInput = editProfileForm.querySelector('#popup__input_content_activity');
const editProfileSaveBtn = editProfileForm.querySelector('.popup__save-btn');

const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const addPhotoForm = addPhotoPopup.querySelector('.popup__form');
const addPhotoClosePopupBtn =  addPhotoPopup.querySelector('.popup__close-btn');
const placeNameInput = addPhotoPopup.querySelector('#popup__input_content_place-name');
const placeLinkInput = addPhotoPopup.querySelector('#popup__input_content_link');
const addPhotoSaveBtn = addPhotoForm.querySelector('.popup__save-btn');

export const viewPhotoPopup = document.querySelector('.popup_type_view-photo');
const viewPhotoPopupCLoseBtn = viewPhotoPopup.querySelector('.popup__close-btn');
export const viewPhotoImage = viewPhotoPopup.querySelector('.popup__photo');
export const viewPhotoDescription = viewPhotoPopup.querySelector('.popup__photo-description');

const photos = document.querySelector('.photos');

const initialCards = [
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

function uploadImages(){
  initialCards.forEach((item) => {
    const newCard = new Card(item.name, item.link,  '#photo-template').generateCard();
    photos.append(newCard);
  });
}
uploadImages();

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  closeButtonSelector:'.popup__close-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' 
}; 

const editProfileFormValidator = new FormValidator(config, editProfileForm);
editProfileFormValidator.enableValidation();

const addPhotoFormValidator = new FormValidator(config, addPhotoForm);
addPhotoFormValidator.enableValidation();

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('click', closeByOverlayClick);
}

const closeByOverlayClick = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if(openedPopup && evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

const closeByEscape = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if(evt.key==='Escape') {
    closePopup(openedPopup);
  }
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('click', closeByOverlayClick);
}

const preparePopupForm = (popup) => {
  const form = popup.querySelector('.popup__form'); 
  const inputList = form.querySelectorAll('.popup__input');
  inputList.forEach((input) => {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    error.textContent ='';
    error.classList.remove(config.errorClass);
  });
  form.reset();
}

const editProfileFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editProfilePopup);
}

const addPhotosSubmitHandler = (evt) => {
  const card = new Card(placeNameInput.value, placeLinkInput.value, '#photo-template').generateCard();
  evt.preventDefault();
  photos.prepend(card);
  addPhotoForm.reset();
  closePopup(addPhotoPopup);
}

profileEditButton.addEventListener('click', () => {
  preparePopupForm(editProfilePopup);
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  editProfileSaveBtn.classList.remove(config.inactiveButtonClass);
  editProfileSaveBtn.disabled = false;
  openPopup(editProfilePopup);
});

addPhotoButton.addEventListener('click', () => {
  preparePopupForm(addPhotoPopup);
  addPhotoSaveBtn.classList.add(config.inactiveButtonClass);
  addPhotoSaveBtn.disabled = true;
  openPopup(addPhotoPopup);
});

editProfileClosePopupBtn.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

addPhotoClosePopupBtn.addEventListener('click', () => {
  closePopup(addPhotoPopup);
});

viewPhotoPopupCLoseBtn.addEventListener('click', () => {
  viewPhotoImage.src = '';
  viewPhotoDescription.textContent = '';
  viewPhotoImage.alt = '';
  closePopup(viewPhotoPopup);
});

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotosSubmitHandler);

