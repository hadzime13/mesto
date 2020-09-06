import { initialCards } from '../utils/initial-cards.js';
import { formClassNames } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

// *** Переменные (по совету наставника - т.к они используются только в этом файле, оставил их здесь.
// Если нужно - вынесу в constants.)

// Попап профиля, его форма и кнопка открытия

const popupProfileSelector = '.popup_profile';
const popupProfileForm = document
  .querySelector(popupProfileSelector)
  .querySelector('.popup__container');
const profileEditButton = document.querySelector('.profile__edit-btn');

// Поля имени и профессии в профиле
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__job';

// Попап карточки, его форма и кнопка открытия

const popupCardSelector = '.popup_cards';
const popupCardsForm = document
  .querySelector(popupCardSelector)
  .querySelector('.popup__container');
const cardAddButton = document.querySelector('.profile__add-btn');

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
const userInfo = new UserInfo(profileNameSelector, profileJobSelector);

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

// Слушатели кнопок открытия попапов профиля и добавления карточки

profileEditButton.addEventListener('click', popupProfile.open.bind(popupProfile));
cardAddButton.addEventListener('click', popupCard.open.bind(popupCard));