export default class Card {
  constructor({data, handleCardClick, handleCardDelete, handleCardAddLike, handleCardRemoveLike, userId}, templateSelector) {
      this._userId = userId;
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._cardId = data._id;
      this._ownerId = data.owner._id
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
      this._handleCardAddLike = handleCardAddLike;
      this._handleCardRemoveLike = handleCardRemoveLike;
  }

  _getTemplate = () => {
      const photoElement = document.querySelector(this._templateSelector)
                                  .content
                                  .cloneNode(true);
      return photoElement;
  }

  _setTrashSignEventListener = () => {
    this._element.querySelector('.photo__delete').addEventListener('click', (evt) => {
      this._handleCardDelete(this._cardId, this);
    });
  }


  _setLikeButtonEventListener = () => {
    this._likeBtn.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('photo__like_active')) {
        this._handleCardRemoveLike(this._cardId, this);
      } else {
        this._handleCardAddLike(this._cardId, this);
      }
      evt.target.classList.toggle('photo__like_active');
    });
  }

  _setImageClickEventListener = () => {
    const self = this;
    this._photoImage = this._element.querySelector('.photo__image');
    this._photoImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _setEventListeners = () => {
    this._setImageClickEventListener();
    this._setLikeButtonEventListener();
    this._setTrashSignEventListener();
  }

  setLikesCount = (count) => {
    this._likesCounter.textContent = count;
  }

  deleteCard = () =>  {
    this._photo.remove();
  }

  generateCard = () => {
      this._element = this._getTemplate();
      this._likesCounter = this._element.querySelector('.photo__like-counter');
      this._likeBtn = this._element.querySelector('.photo__like');
      this._setEventListeners();
      this._photoImage.src = this._link;
      this._photoImage.alt = this._name;
      this._photo = this._element.querySelector('.photo');
      this.setLikesCount(this._likes.length);
      this._element.querySelector('.photo__description').textContent = this._name;

      if(this._userId !== this._ownerId) {
        this._element.querySelector('.photo__delete').style.display = 'none';
      }

      if(this._likes.findIndex((i) => i._id === this._userId) != -1) {
        this._likeBtn.classList.add('photo__like_active');
      }   
      return this._element;  
  }
} 