import { photoPopupOpen } from './index.js'
export class Card {
  constructor(name, link, cardTemplateSelector) {
    this._name = name;
    this._link = link;
    this._cardTemplateSelector = cardTemplateSelector;
  }
// Публичный метод - возвращает карточку
  createCard () {
    const cardElement = document.querySelector(this._cardTemplateSelector).content.cloneNode(true);
    this._cardMarkupHandle(cardElement);
    this._cardListenersHandle(cardElement);
    return cardElement;
  };
// Приватный метод - обработка разметки
  _cardMarkupHandle (cardElement) {
    cardElement.querySelector('.photo-elements__image').src = this._link;
    cardElement.querySelector('.photo-elements__image').alt = this._name;
    cardElement.querySelector('.photo-elements__name').textContent = this._name;
  }
// Приватный метод - слушатели
  _cardListenersHandle (cardElement) {
    cardElement.querySelector('.photo-elements__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-elements__like_active');
    });
    const deleteButton = cardElement.querySelector('.photo-elements__delete-btn');
    deleteButton.addEventListener('click', () => {
      deleteButton.closest('.photo-elements__list-item').remove();
    });
    cardElement.querySelector('.photo-elements__image').addEventListener('click', photoPopupOpen);
  }
};