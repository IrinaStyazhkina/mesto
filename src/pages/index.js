import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

//необходимые константы
import {
  nameInput,
  activityInput,
  editProfileForm,
  editProfileSaveBtn,
  addPhotoForm,
  addPhotoSaveBtn,
  profileEditButton,
  addPhotoButton,
  initialCards,
  config
} from '../utils/constants.js'

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
  renderer: (values) => {    
      const newCard = createCard(values);
      cards.addItem(newCard);
  }
}, '.photos');
cards.renderItems();

const addPhotoPopup = new PopupWithForm('.popup_type_add-photo',
  {
  formSubmit: (values) => {
    const newCard = createCard(values);
    cards.addItem(newCard);
    addPhotoPopup.close();
  }
});

function createCard(values) {
  return new Card( {
    data: values,
    handleCardClick: (name, link) => {
        viewPhotoPopup.open(name, link);
    }
  }, 
      '#photo-template').generateCard();
}

//Валидация
const editProfileFormValidator = new FormValidator(config, editProfileForm);
editProfileFormValidator.enableValidation();

const addPhotoFormValidator = new FormValidator(config, addPhotoForm);
addPhotoFormValidator.enableValidation();

//Обработка событий нажатия на кнопки редактирования профиля и добавления новой карточки
const handleProfileEditButtonClick = () => {
  editProfileFormValidator.resetValidation(true);
  nameInput.value = userInfo.getUserInfo().name;
  activityInput.value = userInfo.getUserInfo().activity;
  editProfilePopup.open();
}

profileEditButton.addEventListener('click', handleProfileEditButtonClick);

const handleAddPhotoButtonClick = () => {
  addPhotoFormValidator.resetValidation(false);
  addPhotoPopup.open();
}

addPhotoButton.addEventListener('click', handleAddPhotoButtonClick);