export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this.setEventListeners();
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClose);
    this._popupElement.removeEventListener('click', this._handleCloseByCloseBtn);
    this._popupElement.classList.remove('popup_opened');

  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
    this._popupElement.addEventListener('click', this._handleCloseByCloseBtn);
  }

  _handleEscClose = (evt) => {
    if(evt.key==='Escape') {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleCloseByCloseBtn = (evt) => {
    if(evt.target.classList.contains('popup__close-btn')) {
      this.close();
    }
  }
}