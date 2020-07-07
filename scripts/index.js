import { initialCards } from './initial-cards.js';
import { formClassNames } from './constants.js'
import { FormValidator } from './FormValidator.js'
import { Card } from './Card.js'

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
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileCloseButton = popupProfile.querySelector('.popup__close-btn');
//для формы попапа редактирования профиля
const profileForm = popupProfile.querySelector('.popup__container');

// Попап добавления карточки 
// для шаблона карточки и списка, куда добавляем карточки
const cardsArea = document.querySelector('.photo-elements__list');

const popupAddCards = document.querySelector('.popup_cards');
// для полей ввода в попапе добавления карточек
const inputCardName = popupAddCards.querySelector('.popup__text_el_place');
const inputCardLink = popupAddCards.querySelector('.popup__text_el_image-link');
// для кнопок попапа добавления карточек
const cardAddButton = document.querySelector('.profile__add-btn');
const cardsCloseButton = popupAddCards.querySelector('.popup__close-btn');
//для формы попапа добавления карточек
const cardAddForm = popupAddCards.querySelector('.popup__container');

// Попап фото
const popupPhoto = document.querySelector('.popup_photo');
const photoCloseButton = popupPhoto.querySelector('.popup__close-btn');

// ***Экземпляры класса валидации, вызов валидации
const ProfileValidator = new FormValidator(formClassNames, popupProfile.querySelector('.popup__container'));
const CardsValidator = new FormValidator(formClassNames, popupAddCards.querySelector('.popup__container'));
ProfileValidator.enableValidation();
CardsValidator.enableValidation();

// *** Функции

// Функция открытия/закрытия попапов
const openClosePopup = (element) => {
  element.classList.toggle('popup_opened');
};

// Функция обработки закрытия попапа (снятие слушателей)

const closePopupHandle = (popup) => {
  document.removeEventListener('keydown', closePopupOnEsc);
  document.removeEventListener('mousedown', closePopupOnOverlayClick);
  openClosePopup(popup);
};


const closePopupOnEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && openedPopup) {
    closePopupHandle(openedPopup);
  }
};


// Функция закрытия попапа кликом на оверлей
const closePopupOnOverlayClick = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup && openedPopup) {
    closePopupHandle(openedPopup);
  }
};

// Функция заполнения полей попапа профиля
const editProfile = () => {
  openClosePopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  ProfileValidator.resetFormValidation();

  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('mousedown', closePopupOnOverlayClick);
};

// Функция сохранения значений, введенных в попап профиля  
const submitProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupHandle(popupProfile);
};

// Функции добавления карточки пользователем

const openPopupCard = () => {
  inputCardLink.value = '';
  inputCardName.value = '';
  CardsValidator.resetFormValidation();
  openClosePopup(popupAddCards);
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('mousedown', closePopupOnOverlayClick);
};

const submitCardForm = (evt) => {
  evt.preventDefault();
  const card = new Card(inputCardName.value, inputCardLink.value, '.template-photo', openPhotoPopup)
  cardsArea.prepend(card.createCard());
  closePopupHandle(popupAddCards);
};

// Функция попапа с фото

export function openPhotoPopup(evt) {
  evt.preventDefault();
  popupPhoto.querySelector('.popup__image').src = evt.target.src;
  popupPhoto.querySelector('.popup__image').alt = evt.target.alt;
  popupPhoto.querySelector('.popup__photo-name').textContent = evt.target.nextElementSibling.textContent;
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('mousedown', closePopupOnOverlayClick);
  openClosePopup(popupPhoto);
};

// *** Обработчики событий

// Слушатели попапа профиля
profileEditButton.addEventListener('click', editProfile);
profileCloseButton.addEventListener('click', function () { closePopupHandle(popupProfile) });
profileForm.addEventListener('submit', submitProfileForm);

// Слушатели попапа добавления карточек
cardAddButton.addEventListener('click', openPopupCard);
cardsCloseButton.addEventListener('click', function () { closePopupHandle(popupAddCards) });
cardAddForm.addEventListener('submit', submitCardForm);

// Слушатель закрытия попапа с фото
photoCloseButton.addEventListener('click', function () { closePopupHandle(popupPhoto) });

// ***Загружаем первые 6 карточек из массива
initialCards.forEach(elem => {
  const card = new Card(elem.name, elem.link, '.template-photo', openPhotoPopup)
  cardsArea.prepend(card.createCard());
});
