import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__photo');
    this._popupDescription = this._popupElement.querySelector('.popup__photo-description');
  }

  open(name, link) {
    this._popupDescription.textContent = name;
    this._popupImage.src = link;
    this._popupImage.alt = name;

    super.open();
  }

  close() {
    super.close();
    this._popupImage.src = '';
    this._popupDescription.textContent = '';
  }
}