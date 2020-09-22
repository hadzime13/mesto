export default class Card {
  constructor({
    name,
    link,
    id,
    likes,
    ownerID,
    myID,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeClick }) {
    this._name = name;
    this._link = link;
    this.likes = likes;
    this._id = id;
    this._ownerID = ownerID;
    this._myID = myID;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
  }
  // Публичный метод - возвращает карточку
  createCard() {
    const cardElement = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
    this._handleCardMarkup(cardElement);
    this._handleCardListeners(cardElement);
    this.setLikes();
    this._cardElement = cardElement;
    return cardElement;
  };
  // Приватный метод - обработка разметки
  _handleCardMarkup(cardElement) {
    const cardElementImage = cardElement.querySelector('.photo-elements__image');
    const cardElementName = cardElement.querySelector('.photo-elements__name');
    const cardElementDelButton = cardElement.querySelector('.photo-elements__delete-btn');
    this._cardElementLikeCounter = cardElement.querySelector('.photo-elements__like-span');
    this._cardElementLike = cardElement.querySelector('.photo-elements__like');
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;
    cardElementName.textContent = this._name;
    if (this._ownerID !== this._myID) {
      cardElementDelButton.classList.add('photo-elements__delete-btn_inactive');
    };
  };

  // Установка, снятие лайков
  setLikes() {
    this.likes.some(likesObj => likesObj._id === this._myID) ? this.isLiked = true : this.isLiked = false;
    this._cardElementLike.classList.toggle(
      'photo-elements__like_active',
      this.isLiked
    );
    this._cardElementLikeCounter.textContent = this.likes.length;
  }

  removeCard(card) {
    card.remove();
  };

  // Приватный метод - слушатели
  _handleCardListeners(cardElement) {
    const cardElementLike = cardElement.querySelector('.photo-elements__like');
    cardElementLike.addEventListener('click', () => { this._handleLikeClick(this) });
    const cardDeleteButton = cardElement.querySelector('.photo-elements__delete-btn');
    cardDeleteButton.addEventListener('click', this._handleDeleteCard);
    cardElement.querySelector('.photo-elements__image').addEventListener('click', () => { this._handleCardClick(this._name, this._link) });
  };
}