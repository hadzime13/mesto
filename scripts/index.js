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

// Функция открытия попапов

const openPopup = (evt) => {
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('mousedown', closePopupOnOverlayClick);
  if (evt.target === profileEditButton) {
    document.querySelector('.popup_profile').classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
    ProfileValidator.resetFormValidation();
  }
  if (evt.target === cardAddButton) {
    document.querySelector('.popup_cards').classList.add('popup_opened');
    inputCardLink.value = '';
    inputCardName.value = '';
    CardsValidator.resetFormValidation();
  }
  if (evt.target.classList.contains('photo-elements__image')) {
    document.querySelector('.popup_photo').classList.add('popup_opened');
    evt.preventDefault();
    const popupImage = document.querySelector('.popup__image');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    document.querySelector('.popup__photo-name').textContent = evt.target.nextElementSibling.textContent;
  }
};
// Функция обработки закрытия попапа (снятие слушателей, закрытие)

const closePopupHandle = (popup) => {
  document.removeEventListener('keydown', closePopupOnEsc);
  document.removeEventListener('mousedown', closePopupOnOverlayClick);
  popup.classList.remove('popup_opened');
};

// Закрытие попапа на Esc
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

// Функция сохранения значений, введенных в попап профиля  
const submitProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupHandle(popupProfile);
};

// Сабмит формы карточки
const submitCardForm = (evt) => {
  evt.preventDefault();
  const card = new Card(inputCardName.value, inputCardLink.value, '.template-photo', openPopup)
  cardsArea.prepend(card.createCard());
  closePopupHandle(popupAddCards);
};

// *** Обработчики событий

// Слушатели попапа профиля
profileEditButton.addEventListener('click', openPopup);
profileCloseButton.addEventListener('click', function () { closePopupHandle(popupProfile) });
profileForm.addEventListener('submit', submitProfileForm);

// Слушатели попапа добавления карточек
cardAddButton.addEventListener('click', openPopup);
cardsCloseButton.addEventListener('click', function () { closePopupHandle(popupAddCards) });
cardAddForm.addEventListener('submit', submitCardForm);

// Слушатель закрытия попапа с фото
photoCloseButton.addEventListener('click', function () { closePopupHandle(popupPhoto) });

// ***Загружаем первые 6 карточек из массива
initialCards.forEach(elem => {
  const card = new Card(elem.name, elem.link, '.template-photo', openPopup)
  cardsArea.prepend(card.createCard());
});