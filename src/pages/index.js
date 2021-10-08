import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import DeletePopup from '../components/DeletePopup';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

//необходимые константы
import {
  nameInput,
  activityInput,
  avatarInput,
  editProfileForm,
  editAvatarForm,
  addPhotoForm,
  profileEditButton,
  addPhotoButton,
  avatarEditButton,
  config,
  apiConfig
} from '../utils/constants.js'

const api = new Api(apiConfig);

const userInfo = new UserInfo('.profile__name', '.profile__activity', '.profile__avatar');

// Отрисовка карточек при открытии страницы 
const cards = new Section({
  renderer: (item) => {    
      const newCard = createCard(item);
      cards.addItem(newCard);
  }
}, '.photos');

// Заполнение профиля данными с сервера
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(res => {
    userInfo.setUserInfo(res[0]);
    cards.renderItems(res[1]); 
  })
  .catch((err) => console.error(err));;

// Редактирование профиля
const editProfilePopup = new PopupWithForm('.popup_type_edit-profile',
  {
  formSubmit: (values) => {
    editProfilePopup.toggleButtonText("Сохранение...");
    api.editProfile(values.name, values.activity).then(
      data => {
        userInfo.setUserInfo(data);
        editProfilePopup.close();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        editProfilePopup.toggleButtonText("Сохранить");
      });
  }
});

//Изменение аватара
const editAvatarPopup = new PopupWithForm('.popup_type_edit-avatar', {
  formSubmit: (values) => {
    editAvatarPopup.toggleButtonText("Сохранение...");
    api.editAvatar(values.avatar).then(
      data => {
      userInfo.setUserAvatar(data);
      editAvatarPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      editAvatarPopup.toggleButtonText("Сохранить");
    });
  }
});

// Добавление новой карточки
const addPhotoPopup = new PopupWithForm('.popup_type_add-photo',
  {
  formSubmit: (values) => {
    addPhotoPopup.toggleButtonText("Сохранение...")
    api.addCard(values.name, values.link).then(data => {
      const newCard = createCard(data);
      cards.addItem(newCard);
      addPhotoPopup.close()
    })
    .catch((err) => console.error(err))
    .finally(() => {
      editAvatarPopup.toggleButtonText("Создать");
    });
  }
});
const viewPhotoPopup = new PopupWithImage('.popup_type_view-photo');
const deletePopup = new DeletePopup('.popup_type_delete-photo', {
  confirmDelete: (cardId, card) => {
    api.deleteCard(cardId).then( (res) => {
      card.deleteCard();
      deletePopup.close();
    })
    .catch((err) => console.error(err))  
  }
});

//Генерация карточки
function createCard(values) {
  const card = new Card( {
    data: values,
    handleCardClick: (name, link) => {
        viewPhotoPopup.open(name, link);
    },
    handleCardDelete: (_id, card) => {
      deletePopup.open(_id, card);
    },
    handleCardAddLike: (_id, card) => {
      api.addLike(_id).then((res) => {
        card.setLikesCount(res.likes.length);
        card.toggleLikeButton();
      })
      .catch((err) => console.error(err))  
    },
    handleCardRemoveLike: (_id, card) => {
      api.removeLike(_id).then((res) => {
        card.setLikesCount(res.likes.length);
        card.toggleLikeButton();
      })
      .catch((err) => console.error(err))
    },
    userId: userInfo.getUserId()
  }, 
      '#photo-template').generateCard();
  return card;
}

//Валидация
const editProfileFormValidator = new FormValidator(config, editProfileForm);
editProfileFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(config, editAvatarForm);
editAvatarFormValidator.enableValidation();

const addPhotoFormValidator = new FormValidator(config, addPhotoForm);
addPhotoFormValidator.enableValidation();

//Обработка событий нажатия на кнопки редактирования профиля, аватара и добавления новой карточки
const handleProfileEditButtonClick = () => {
  editProfileFormValidator.resetValidation(true);
  nameInput.value = userInfo.getUserInfo().name;
  activityInput.value = userInfo.getUserInfo().activity;
  editProfilePopup.open();
}

profileEditButton.addEventListener('click', handleProfileEditButtonClick);

const handleAvatarEditButtonClick = () => {
  editAvatarFormValidator.resetValidation(true);
  editAvatarPopup.open();
}

avatarEditButton.addEventListener('click', handleAvatarEditButtonClick)

const handleAddPhotoButtonClick = () => {
  addPhotoFormValidator.resetValidation(false);
  addPhotoPopup.open();
}

addPhotoButton.addEventListener('click', handleAddPhotoButtonClick);