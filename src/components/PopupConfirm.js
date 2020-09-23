import Popup from './Popup.js'

export default class PopupConfirm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  // Перегрузка метода добавления обработчика кнопке закрытия - добавление обработчика сабмита
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__container').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._target, this._class);
    });
  }
 
  open(targetConfirm, classConfirm) {
    this._target = targetConfirm;
    this._class = classConfirm;
    super.open();
  }
}