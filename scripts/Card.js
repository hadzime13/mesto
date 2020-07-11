export class Card {
  constructor(name, link, cardTemplateSelector, openPhotoPopup) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._openPhotoPopup = openPhotoPopup;
  }
  // Публичный метод - возвращает карточку
  createCard() {
    const cardElement = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
    this._handleCardMarkup(cardElement);
    this._handleCardListeners(cardElement);
    return cardElement;
  };
  // Приватный метод - обработка разметки
  _handleCardMarkup(cardElement) {
    const cardElementImage = cardElement.querySelector('.photo-elements__image');
    const cardElementName = cardElement.querySelector('.photo-elements__name');
    cardElementImage.src = this._link;
    cardElementImage.alt = this._name;
    cardElementName.textContent = this._name;
  };
  // Методы для слушателей
  _toggleLike(evt) {
    evt.target.classList.toggle('photo-elements__like_active');
  };
  _removeCard(evt) {
    evt.target.closest('.photo-elements__list-item').remove();
  };

  // Приватный метод - слушатели
  _handleCardListeners(cardElement) {
    const cardElementLike = cardElement.querySelector('.photo-elements__like');
    cardElementLike.addEventListener('click', this._toggleLike);
    const cardDeleteButton = cardElement.querySelector('.photo-elements__delete-btn');
    cardDeleteButton.addEventListener('click', this._removeCard);
    cardElement.querySelector('.photo-elements__image').addEventListener('click', this._openPhotoPopup);
  };
}