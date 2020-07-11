export class FormValidator {
  constructor(formClassNames, formElement) {
    this._formClassNames = formClassNames;
    this._formElement = formElement;
    this._inputElements = Array.from(formElement.querySelectorAll(formClassNames.inputSelector));
    this._submitButton = formElement.querySelector(formClassNames.submitButtonSelector);
  };
  // Публичный метод - валидация формы
  enableValidation() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', evt => { this._handleInput(inputElement, this._formClassNames) });
    });

    this._formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });

    this._formElement.addEventListener('input', evt => { this._toggleButtonState(this._formElement, this._submitButton, this._formClassNames) })
  };
  // Публичный метод - сброс ошибок, состояния кнопки
  resetFormValidation() {
    this._inputElements.forEach((input) => {
      this._hideErrors(input, this._formElement.querySelector(`#${input.id}-error`), this._formClassNames);
      this._toggleButtonState(this._formElement, this._submitButton, this._formClassNames);
    });
  }
  // Приватный метод - переключениe состояния кнопки на форме

  _toggleButtonState(formElement, submitButton, formClassNames) {
    const hasErrors = !formElement.checkValidity();
    submitButton.disabled = hasErrors;
    submitButton.classList.toggle(
      formClassNames.inactiveButtonClass,
      hasErrors
    );
  };

  // Приватный метод - обработка инпутов на форме
  _handleInput(inputElement, formClassNames) {
    const error = document.querySelector(`#${inputElement.id}-error`);
    this._isValid(inputElement, error, formClassNames);
  };

  // Приватный метод - проверка на валидность
  _isValid(inputElement, error, formClassNames) {
    if (inputElement.checkValidity()) {
      this._hideErrors(inputElement, error, formClassNames);
    }
    else {
      this._showErrors(inputElement, error, formClassNames);
    }
  };

  // Приватный метод - скрытие ошибок
  _hideErrors(inputElement, error, formClassNames) {
    inputElement.classList.remove(formClassNames.inputErrorClass);
    error.classList.remove(formClassNames.errorClass);
    error.textContent = '';
  };

  // Приватный метод - показ ошибок
  _showErrors(inputElement, error, formClassNames) {
    inputElement.classList.add(formClassNames.inputErrorClass);
    error.classList.add(formClassNames.errorClass);
    error.textContent = inputElement.validationMessage;
  };
}
