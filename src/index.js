import './pages/index.css';

import Card from './scripts/Card.js';
import FormValidator from './scripts/FormValidator.js';
import PopupWithForm from './scripts/PopupWithForm.js';
import PopupWithImage from './scripts/PopupWithImage.js';
import UserInfo from './scripts/UserInfo.js';
import Section from './scripts/Section.js';

//необходимые константы
const profileEditButton = document.querySelector('.profile__edit-btn');
const addPhotoButton = document.querySelector('.profile__add-btn');

const editPopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('#popup__input_content_name');
const activityInput = editPopup.querySelector('#popup__input_content_activity');
const editProfileSaveBtn = editPopup.querySelector('.popup__save-btn');
const addPopup = document.querySelector('.popup_type_add-photo');
const addPhotoForm = addPopup.querySelector('.popup__form');
const addPhotoSaveBtn = addPhotoForm.querySelector('.popup__save-btn');

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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  closeButtonSelector:'.popup__close-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible' 
}; 

const userInfo = new UserInfo('.profile__name', '.profile__activity');
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile',
  {
  formSubmit: (values) => {
    userInfo.setUserInfo(values);
    editProfilePopup.close();
  }
});

const viewPhotoPopup = new PopupWithImage('.popup_type_view-photo');

// Отрисовка карточек при открытии страницы 
const cards = new Section({
  items: initialCards,
  renderer: (item) => {    
      const newCard = new Card( {
        data: item,
        handleCardClick: (name, link) => {
            viewPhotoPopup.open(name, link);
        }
      }, 
          '#photo-template').generateCard();
      cards.addItem(newCard);
  }
}, '.photos');
cards.renderItems();

const addPhotoPopup = new PopupWithForm('.popup_type_add-photo',
  {
  formSubmit: (values) => {
    const newCard = new Card({
      data: values,
      handleCardClick: (name, link) => {
        viewPhotoPopup.open(name, link);
      }
    }, '#photo-template').generateCard();
    cards.addItem(newCard);
    addPhotoPopup.close();
  }
});

//Валидация
const editProfileFormValidator = new FormValidator(config, editProfileForm);
editProfileFormValidator.enableValidation();

const addPhotoFormValidator = new FormValidator(config, addPhotoForm);
addPhotoFormValidator.enableValidation();

//Обработка событий нажатия на кнопки редактирования профиля и добавления новой карточки
const handleProfileEditButtonClick = () => {
  editProfileFormValidator.resetErrorFields();
  nameInput.value = userInfo.getUserInfo().name;
  activityInput.value = userInfo.getUserInfo().activity;
  editProfileSaveBtn.classList.remove(config.inactiveButtonClass);
  editProfileSaveBtn.disabled = false;
  editProfilePopup.open();
}

profileEditButton.addEventListener('click', handleProfileEditButtonClick);

const handleAddPhotoButtonClick = () => {
  addPhotoFormValidator.resetErrorFields();
  addPhotoSaveBtn.classList.add(config.inactiveButtonClass);
  addPhotoSaveBtn.disabled = true;
  addPhotoPopup.open();
}

addPhotoButton.addEventListener('click', handleAddPhotoButtonClick);