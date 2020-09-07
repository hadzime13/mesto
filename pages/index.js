import { initialCards } from '../utils/initial-cards.js';
import { formClassNames } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

// Селектор формы попапа
const popupFormSelector = '.popup__container';


// Попап профиля, его форма и кнопка открытия

const popupProfileSelector = '.popup_profile';
const popupProfileButton = '.profile__edit-btn';
const popupProfileForm = document
  .querySelector(popupProfileSelector)
  .querySelector(popupFormSelector);
const profileEditButton = document.querySelector(popupProfileButton);

// Поля имени и профессии в профиле
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';
const popupProfileNameSelector = '.popup__text_el_name';
const popupProfileJobSelector = '.popup__text_el_job';


// Попап карточки, его форма и кнопка открытия

const popupCardSelector = '.popup_cards';
const popupCardButton = '.profile__add-btn';
const popupCardsForm = document
  .querySelector(popupCardSelector)
  .querySelector(popupFormSelector);
const cardAddButton = document.querySelector(popupCardButton);

// Попап с фото
const popupPhotoSelector = '.popup_photo';

// Селектор шаблона карточки
const cardTemplateSelector = '.template-photo';

// Селектор контейнера карточек
const cardsAreaSelector = '.photo-elements__list';


// ***Экземпляры класса валидации, вызов валидации
const ProfileValidator = new FormValidator(formClassNames, popupProfileForm);
const CardsValidator = new FormValidator(formClassNames, popupCardsForm);
ProfileValidator.enableValidation();
CardsValidator.enableValidation();

// Экземпляры классов попапов

// Попап фото
const popupPhoto = new PopupWithImage(popupPhotoSelector);

// Класс с инфо о пользователе
const userInfo = new UserInfo(profileNameSelector, profileJobSelector, popupProfileNameSelector, popupProfileJobSelector);


// Класс попапа профиля
const popupProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitForm: (values) => {
    userInfo.setUserInfo(values['input-name'], values['input-job']);
    popupProfile.close();
  }
})
popupProfile.setEventListeners();

// Загружаем первые 6 карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      name: item.name,
      link: item.link,
      cardTemplateSelector: cardTemplateSelector,
      handleCardClick: (evt) => {
        popupPhoto.open(evt);
        popupPhoto.setEventListeners();
      }
    });
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}, cardsAreaSelector);

cardList.renderItems();

// Класс попапа добавления карточки
const popupCard = new PopupWithForm({
  popupSelector: popupCardSelector,
  submitForm: (values) => {
    const card = new Card({
      name: values['input-place'],
      link: values['input-link'],
      cardTemplateSelector: cardTemplateSelector,
      handleCardClick: (evt) => {
        popupPhoto.open(evt);
        popupPhoto.setEventListeners();
      }
    })
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
    popupCard.close();
  }
});
popupCard.setEventListeners();

// Слушатели кнопок открытия попапов профиля и добавления карточки + заполнение полей и сброс валидации при открытии

profileEditButton.addEventListener('click', function () {
  popupProfile.open.bind(popupProfile)();
  userInfo.fillUserForm();
  ProfileValidator.resetFormValidation();
});
cardAddButton.addEventListener('click', function () { 
  popupCard.open.bind(popupCard)();
  CardsValidator.resetFormValidation();
 });