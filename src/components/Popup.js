export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscCloseBind = this._handleEscClose.bind(this);
  }
  // Метод открытие попапа, добавление обработчиков
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseBind);
    document.addEventListener('mousedown', this._handleEscCloseBind);
  }
  // Метод закрытия попапа, снятие обработчиков
  close() {
    document.removeEventListener('keydown', this._handleEscCloseBind);
    document.removeEventListener('mousedown', this._handleEscCloseBind);
    this._popup.classList.remove('popup_opened');
  }
  // Метод закрытия по клику на Esc и на оверлей попапа
  _handleEscClose(evt) {
    if ((evt.key === 'Escape' && this._popup) || (evt.target === this._popup && this._popup)) {
      this.close();
    }
  };

  // Метод добавления обработчика на кнопку закрытия
  setEventListeners() {
    const popupCloseButton = this._popup.querySelector('.popup__close-btn');
    popupCloseButton.addEventListener('click', this.close.bind(this));
  }
}
