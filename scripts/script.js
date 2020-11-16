const profileEditButton = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const addPhotoButton = document.querySelector('.profile__add-btn');

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__container');
const editProfileClosePopupBtn = editProfileForm.querySelector('.popup__close-btn');
const nameInput = editProfileForm.querySelector('.popup__input_content_name');
const activityInput = editProfileForm.querySelector('.popup__input_content_activity');

const addPhotoPopup = document.querySelector('.popup_type_add-photo');
const addPhotoForm = addPhotoPopup.querySelector('.popup__container');
const addPhotoClosePopupBtn =  addPhotoPopup.querySelector('.popup__close-btn');
const placeNameInput = addPhotoPopup.querySelector('.popup__input_content_place-name');
const placeLinkInput = addPhotoPopup.querySelector('.popup__input_content_place-link');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
  openPopup(editProfilePopup);
})

editProfileClosePopupBtn.addEventListener('click', function() {
  closePopup(editProfilePopup);
})

function editProfileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  closePopup(editProfilePopup);
}

  function createNewPhotoCard(name, link) {
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

function addPhotosSubmitHandler(evt) {
  evt.preventDefault();
  photos.prepend(createNewPhotoCard(placeNameInput.value, placeLinkInput.value));
  placeNameInput.value='';
  placeLinkInput.value='';
  closePopup(addPhotoPopup);
}

editProfileForm.addEventListener('submit', editProfileFormSubmitHandler);
addPhotoForm.addEventListener('submit', addPhotosSubmitHandler);

addPhotoButton.addEventListener('click', function(){
  openPopup(addPhotoPopup);
})

addPhotoClosePopupBtn.addEventListener('click', function() {
  closePopup(addPhotoPopup);
})

viewPhotoPopupCLoseBtn.addEventListener('click', function() {
  viewPhotoImage.src = '';
  viewPhotoDescription.textContent = '';
  closePopup(viewPhotoPopup);
})

function uploadImages() {
  initialCards.forEach((card) => {
    photos.append(createNewPhotoCard(card.name, card.link));
  })
}

uploadImages();
