import Popup from './Popup.js'

export default class DeletePopup extends Popup {
    constructor(popupSelector, {confirmDelete}) {
        super(popupSelector);
        this._confirmDelete = confirmDelete;
        this._popupForm = this._popupElement.querySelector('.popup__form');
      }

      open(cardId, card) {
          this._cardId = cardId;
          this._card = card;
          super.open();
      }

      setEventListeners() {
        this._popupForm.addEventListener('submit', this._handleConfirmDelete);
        super.setEventListeners();
      }

      close() {
        this._popupForm.removeEventListener('submit', this._handleConfirmDelete);
        super.close();
      }

      _handleConfirmDelete = (evt) => {
        evt.preventDefault();
        this._confirmDelete(this._cardId, this._card);
      }
}