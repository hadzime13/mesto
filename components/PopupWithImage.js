import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  // Перегрузка метода открытия - картинка попапа
  open(evt) {
    super.open();
    evt.preventDefault();
    const popupImage = this._popup.querySelector('.popup__image');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    this._popup.querySelector('.popup__photo-name').textContent = evt.target.nextElementSibling.textContent;
  }
}