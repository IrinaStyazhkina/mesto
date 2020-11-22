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

const viewPhotoPopup = document.querySelector('.popup_type_view-photo');
const viewPhotoPopupCLoseBtn = viewPhotoPopup.querySelector('.popup__close-btn');
const viewPhotoImage = viewPhotoPopup.querySelector('.popup__photo');
const viewPhotoDescription = viewPhotoPopup.querySelector('.popup__photo-description');

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

const photoTemplate = document.querySelector('#photo-template').content;
const photos = document.querySelector('.photos');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
  if(popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
    const form = popup.querySelector('.popup__form'); 
    if(form) {
      const inputList = form.querySelectorAll('.popup__input');
      inputList.forEach((input) => {
        hideError(form, input, validationConfig);
      });
      form.reset();
    } 
  }  
}

const editProfileFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editProfilePopup);
}

const createNewPhotoCard = (name, link) => {
  const photoElement = photoTemplate.cloneNode(true);
  const photoImage = photoElement.querySelector('.photo__image');

  photoImage.src = link;
  photoElement.querySelector('.photo__description').textContent = name;

  photoImage.addEventListener('click', function(evt){
    viewPhotoImage.src = link;
    viewPhotoDescription.textContent = name;
    openPopup(viewPhotoPopup);
  });

  photoElement.querySelector('.photo__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('photo__like_active');
  })
  photoElement.querySelector('.photo__delete').addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  })
  return photoElement;
}

const addPhotosSubmitHandler = (evt) => {
  evt.preventDefault();
  photos.prepend(createNewPhotoCard(placeNameInput.value, placeLinkInput.value));
  addPhotoForm.reset();
  closePopup(addPhotoPopup);
}

const uploadImages = () => {
  initialCards.forEach((card) => {
    photos.append(createNewPhotoCard(card.name, card.link));
  })
}

uploadImages();

document.addEventListener('click', (evt) => {
  const target = evt.target;
  switch(target) {
    case profileEditButton: 
      nameInput.value = profileName.textContent;
      activityInput.value = profileActivity.textContent;
      toggleButtonState( editProfileSaveBtn, true, validationConfig);
      openPopup(editProfilePopup);
      break;
    case addPhotoButton: 
      toggleButtonState(addPhotoSaveBtn, false, validationConfig);
      openPopup(addPhotoPopup);
      break;
    case editProfileClosePopupBtn: 
      closePopup(editProfilePopup);
      break;
    case addPhotoClosePopupBtn: 
      closePopup(addPhotoPopup);
      break;
    case viewPhotoPopupCLoseBtn:
      viewPhotoImage.src = '';
      viewPhotoDescription.textContent = '';
      closePopup(viewPhotoPopup);
      break;
  }

  const openedPopup = document.querySelector('.popup_opened');
  if(openedPopup && target === openedPopup) {
    closePopup(openedPopup);
  }

});

document.addEventListener('keydown', (evt) => {
  if(evt.key==='Escape') {
    popupList.forEach((popup) => {
      closePopup(popup);
    });
  }
});

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotosSubmitHandler);