import {viewPhotoImage, viewPhotoDescription, openPopup, viewPhotoPopup} from './index.js';

export class Card {
  constructor(name, link, templateSelector) {
      this._name = name;
      this._link = link;
      this._templateSelector = templateSelector;
  }

  _getTemplate() {
      const photoElement = document.querySelector(this._templateSelector)
                                  .content
                                  .cloneNode(true);
      return photoElement;
  }

  _setTrashSignEventListener() {
    this._element.querySelector('.photo__delete').addEventListener('click', function(evt) {
      evt.target.parentElement.remove();
    });
  }

  _setLikeButtonEventListener() {
    this._element.querySelector('.photo__like').addEventListener('click', function(evt) {
      evt.target.classList.toggle('photo__like_active');
    });
  }

  _setImageClickEventListener() {
    const self = this;
    this._photoImage = this._element.querySelector('.photo__image');
    this._photoImage.addEventListener('click', function(){
      viewPhotoImage.src = self._link;
      viewPhotoDescription.textContent = self._name;
      viewPhotoImage.alt = self._name;
      openPopup(viewPhotoPopup);
    });
  }

  _setEventListeners() {
    this._setImageClickEventListener();
    this._setLikeButtonEventListener();
    this._setTrashSignEventListener();
  }

  generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._photoImage.src = this._link;
      this._photoImage.alt = name;
      this._element.querySelector('.photo__description').textContent = this._name;

      return this._element;  
  }
} 