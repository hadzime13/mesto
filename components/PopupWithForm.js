import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  // Метод сбора данных формы
  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__text');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  // Перегрузка метода добавления обработчика кнопке закрытия - добавление обработчика сабмита
  setEventListeners() {
    super.setEventListeners();
    this._popup.querySelector('.popup__container').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  // Перегрузка метода закрытия попапа - сброс полей формы
  close() {
    super.close();
    this._inputList = this._popup.querySelectorAll('.popup__text');
    this._inputList.forEach(input => {
      input.value = "";
    })
  }
}