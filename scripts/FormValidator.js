export class FormValidator {
  constructor(classnames, formElement) {
    this._classnames = classnames;
    this._formElement = formElement;
    this._inputElements = Array.from(formElement.querySelectorAll(classnames.inputSelector));
    this._submitButton = formElement.querySelector(classnames.submitButtonSelector);
  };
  // Публичный метод - валидация формы
  enableValidation() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', evt => { this._handleinput(inputElement, this._classnames) });
    });

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._formElement.addEventListener('input', evt => { this._toggleButtonState(this._formElement, this._submitButton, this._classnames) })
  };
// Публичный метод - сброс ошибок, состояния кнопки
  resetFormValidation() {
    this._inputElements.forEach((input) => {
      this._hideErrors(input, this._formElement.querySelector(`#${input.id}-error`), this._classnames);
      this._toggleButtonState(this._formElement, this._submitButton, this._classnames);
    });
  }
  // Приватный метод - переключениe состояния кнопки на форме

  _toggleButtonState(formElement, submitButton, classnames) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(
      classnames.inactiveButtonClass,
      hasErrors
    );
  };

  // Приватный метод - обработка инпутов на форме
  _handleinput(inputElement, classnames) {
    const error = document.querySelector(`#${inputElement.id}-error`);
    this._isValid(inputElement, error, classnames);
  };

  // Приватный метод - проверка на валидность
  _isValid(inputElement, error, classnames) {
    if (inputElement.checkValidity()) {
      this._hideErrors(inputElement, error, classnames);
    }
    else {
      this._showErrors(inputElement, error, classnames);
    };
  };

  // Приватный метод - скрытие ошибок
  _hideErrors(inputElement, error, classnames) {
    inputElement.classList.remove(classnames.inputErrorClass);
    error.classList.remove(classnames.errorClass);
    error.textContent = '';
  };

  // Приватный метод - показ ошибок
  _showErrors(inputElement, error, classnames) {
    inputElement.classList.add(classnames.inputErrorClass);
    error.classList.add(classnames.errorClass);
    error.textContent = inputElement.validationMessage;
  };
};
