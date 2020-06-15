
// *** Переменные

// Попап профиля
// для попапа 
const popupProfile = document.querySelector('.popup_profile');
// для имени и профессии в профиле
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// для полей ввода в попапе рекдактирования профиля
const inputName = popupProfile.querySelector('.popup__text_el_name');
const inputJob = popupProfile.querySelector('.popup__text_el_job');
// для кнопок попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = popupProfile.querySelector('.popup__close-btn');
//для формы попапа редактирования профиля
const profileForm = popupProfile.querySelector('.popup__container');

// Попап добавления карточки 
// для шаблона карточки и списка, куда добавляем карточки
const cardTemplate = document.querySelector('.template-photo').content;
const cardsArea = document.querySelector('.photo-elements__list');

const popupAddCards = document.querySelector('.popup_cards');
// для полей ввода в попапе добавления карточек
const inputCardName = popupAddCards.querySelector('.popup__text_el_place');
const inputCardLink = popupAddCards.querySelector('.popup__text_el_image-link');
// для кнопок попапа добавления карточек
const addButton = document.querySelector('.profile__add-btn');
const cardsCloseButton = popupAddCards.querySelector('.popup__close-btn');
//для формы попапа добавления карточек
const cardAddForm = popupAddCards.querySelector('.popup__container');

// Попап фото
const popupPhoto = document.querySelector('.popup_photo');
const photoCloseButton = popupPhoto.querySelector('.popup__close-btn');

// *** Функции

// Функция открытия/закрытия попапов
const popupOpenClose = (element) => {
  element.classList.toggle('popup_opened');
};


// Функция обработки закрытия попапа (очистка ошибок, снятие слушателей)

const closePopupHandle = (popup) => {
  const inputs = Array.from(popup.querySelectorAll('.popup__text'));
  inputs.forEach((input) => {
    hideErrors(input, popup.querySelector(`#${input.id}-error`), classnames);
  });
  document.removeEventListener('keydown', popupExitOnEsc);
  document.removeEventListener('click', popupExitOnOverlayClick);
  popupOpenClose(popup);
};

// Функция закрытия попапа на Escape
const popupExitOnEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    if (openedPopup) {
      closePopupHandle(openedPopup);
    };
  };
};

// Функция закрытия попапа кликом на оверлей
const popupExitOnOverlayClick = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup) {
    if (openedPopup) {
      closePopupHandle(openedPopup);
    }
  };
};




// Функция заполнения полей попапа профиля
const profileEdit = () => {
  popupOpenClose(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  toggleButtonState(popupProfile.querySelector(classnames.formSelector),
    popupProfile.querySelector(classnames.submitButtonSelector),
    classnames);
  document.addEventListener('keydown', popupExitOnEsc);
  document.addEventListener('click', popupExitOnOverlayClick);
}

// Функция сохранения значений, введенных в попап профиля  
const profileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupOpenClose(popupProfile);
}

// Функция создания карточки и слушателей в ней

const createCard = (name, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.photo-elements__image').src = link;
  cardElement.querySelector('.photo-elements__image').alt = name;
  cardElement.querySelector('.photo-elements__name').textContent = name;
  cardElement.querySelector('.photo-elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-elements__like_active');
  });
  const deleteButton = cardElement.querySelector('.photo-elements__delete-btn');
  deleteButton.addEventListener('click', function () {
    deleteButton.closest('.photo-elements__list-item').remove();
  });
  cardElement.querySelector('.photo-elements__image').addEventListener('click', photoPopupOpen)
  return cardElement;
};

// Функции добавления карточки пользователем

const cardPopupOpen = () => {
  inputCardLink.value = '';
  inputCardName.value = '';
  popupOpenClose(popupAddCards);
  toggleButtonState(popupAddCards.querySelector(classnames.formSelector),
    popupAddCards.querySelector(classnames.submitButtonSelector),
    classnames);
  document.addEventListener('keydown', popupExitOnEsc);
  document.addEventListener('click', popupExitOnOverlayClick);
}

const cardsFormSubmit = (evt) => {
  evt.preventDefault();
  cardsArea.prepend(createCard(inputCardName.value, inputCardLink.value));
  popupOpenClose(popupAddCards);
};

// Функция попапа с фото

function photoPopupOpen(evt) {
  evt.preventDefault();
  popupPhoto.querySelector('.popup__image').src = evt.target.src;
  popupPhoto.querySelector('.popup__image').alt = evt.target.alt;
  popupPhoto.querySelector('.popup__photo-name').textContent = evt.target.nextElementSibling.textContent;
  popupOpenClose(popupPhoto);
}

// *** Обработчики событий

// "Слушатели" попапа профиля
editButton.addEventListener('click', profileEdit);
closeButton.addEventListener('click', function () { closePopupHandle(popupProfile) });
profileForm.addEventListener('submit', profileFormSubmit);


// Слушатели попапа добавления карточек
addButton.addEventListener('click', cardPopupOpen);
cardsCloseButton.addEventListener('click', function () { closePopupHandle(popupAddCards) });
cardAddForm.addEventListener('submit', cardsFormSubmit);


// Слушатель закрытия попапа с фото
photoCloseButton.addEventListener('click', function () { popupOpenClose(popupPhoto) });

// Загружаем первые 6 карточек из массива
initialCards.forEach(elem => {
  cardsArea.prepend(createCard(elem.name, elem.link));
});
enableValidation(classnames);