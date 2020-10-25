let profileEditButton = document.querySelector(".profile__edit-btn");
let profileName = document.querySelector(".profile__name");
let profileActivity = document.querySelector(".profile__activity");

let popup = document.querySelector(".popup");
let editProfileForm = popup.querySelector(".popup__container");
let closePopupBtn = editProfileForm.querySelector(".popup__close-btn");
let nameInput = editProfileForm.querySelector(".popup__input_content_name");
let activityInput = editProfileForm.querySelector(".popup__input_content_activity");

profileEditButton.addEventListener("click", function() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  activityInput.value = profileActivity.textContent;
})

closePopupBtn.addEventListener("click", function() {
  popup.classList.remove("popup_opened");
})

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileActivity.textContent = activityInput.value;
  popup.classList.remove("popup_opened");
}

editProfileForm.addEventListener("submit", formSubmitHandler);
