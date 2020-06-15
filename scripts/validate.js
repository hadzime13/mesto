const enableValidation = (classnames) => {
  // Находим все формы
  const formElements = Array.from(document.querySelectorAll(classnames.formSelector));

  // Находим все инпуты у каждой формы 
  formElements.forEach((formElement) => {
    const inputElements = Array.from(formElement.querySelectorAll(classnames.inputSelector));

    // для всех инпутов добавляем слушатель и функцию обработчик
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', evt => { handleinput (inputElement, classnames) });
    });

    // Находим все кнопки отправки и отменяем обработку сабмита по умолчанию.
    const submitButton = formElement.querySelector(classnames.submitButtonSelector);
    formElement.addEventListener('submit', evt => {
      evt.preventDefault()
    })

    // добавляем слушатель и обработчик состояния кнопки
    formElement.addEventListener('input', evt => { toggleButtonState(formElement, submitButton, classnames)})

  });
};

// Функция переключения состояния кнопки на форме

const toggleButtonState = (formElement, submitButton, classnames) => {
  const hasErrors = !formElement.checkValidity();
  submitButton.disabled = hasErrors;
  submitButton.classList.toggle(
    classnames.inactiveButtonClass,
    hasErrors
  )
};


// Функция обработки инпутов
const handleinput = (inputElement, classnames) => {
  const error = document.querySelector(`#${inputElement.id}-error`);
  isValid(inputElement, error, classnames);
};

// Функция проверки на валидность
const isValid = (inputElement, error, classnames) => {
  if (inputElement.checkValidity()) {
    hideErrors(inputElement, error, classnames);
  }
  else {
    showErrors(inputElement, error, classnames);
  };
};

// Функция скрытия ошибок
const hideErrors = (inputElement, error, classnames) => {
  inputElement.classList.remove(classnames.inputErrorClass);
  error.classList.remove(classnames.errorClass);
  error.textContent = '';
};

// Функция показа ошибок
const showErrors = (inputElement, error, classnames) => {
  inputElement.classList.add(classnames.inputErrorClass);
  error.classList.add(classnames.errorClass);
  error.textContent = inputElement.validationMessage;
};
