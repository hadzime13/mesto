import { formClassNames } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import './index.css';
import PopupConfirm from '../components/PopupConfirm.js';


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
const profileAvatarSelector = '.profile__avatar';
const popupProfileNameSelector = '.popup__text_el_name';
const popupProfileJobSelector = '.popup__text_el_job';
const myID = '8b0c87708baf54b953136930';

// Попап карточки, его форма и кнопка открытия

const popupCardSelector = '.popup_cards';
const popupCardButton = '.profile__add-btn';
const popupCardsForm = document
  .querySelector(popupCardSelector)
  .querySelector(popupFormSelector);
const cardAddButton = document.querySelector(popupCardButton);

// Попап подтверждения удаления 
const popupConfirmSelector = '.popup_confirm';

// Попап с фото
const popupPhotoSelector = '.popup_photo';

// ПОпап редактирования аватара
const popupAvatarEditSelector = '.popup_avatar';
const avatarEditBtn = document.querySelector('.profile__avatar-edit-btn');
const popupAvatarEditForm = document
  .querySelector(popupAvatarEditSelector)
  .querySelector(popupFormSelector);

// Селектор шаблона карточки
const cardTemplateSelector = '.template-photo';

// Селектор контейнера карточек
const cardsAreaSelector = '.photo-elements__list';

// Экземляр класса для работы с API

const PageApi = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '37456d63-78f1-44ef-bbbe-976c826581c0',
    'Content-Type': 'application/json'
  }
});

// Массив промисов

const Promises = [PageApi.getUser(), PageApi.getInitialCards()];

// Класс попапа с подтверждением

const PopupWithConfirm = new PopupConfirm({
  popupSelector: popupConfirmSelector,
  submitForm: (deleteTarget, classConfirm) => {
    PageApi.deleteCard(classConfirm._id);
    classConfirm.removeCard(deleteTarget);
    PopupWithConfirm.close();
  }
})

// Экземпляр класса Section для карточек
const cardList = new Section({
  renderer: (item) => {
    const card = new Card({
      name: item.name,
      link: item.link,
      id: item._id,
      likes: item.likes,
      ownerID: item.owner._id,
      myID: myID,
      cardTemplateSelector: cardTemplateSelector,
      handleCardClick: (evt) => {
        popupPhoto.open(evt);
        popupPhoto.setEventListeners();
      },
      handleDeleteCard: (evt) => {
        let deleteTarget = evt.target.closest('.photo-elements__list-item');
        PopupWithConfirm.open(evt);
        PopupWithConfirm.setEventListeners();
        PopupWithConfirm.getInfo(deleteTarget, card);
      },
      handleLikeClick: (card) => {

        if (card.isLiked) {
          PageApi.disLike(card._id)
            .then((res) => {
              card.likes = res.likes;
              card.setLikes();
            });
        }
        else {
          PageApi.like(card._id)
            .then((res) => {
              card.likes = res.likes;
              card.setLikes();
            });
        }
      }
    });
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
  }
}
  , cardsAreaSelector);



// Загрузка инфо о пользователе + загрузка карточек
Promise.all(Promises)
  .then(([user, cards]) => {
    userInfo.setUserInfo(user['name'], user['about']);
    userInfo.setUserAvatar(user['avatar']);
    cardList.renderItems(cards);
  }
  )

// ***Экземпляры класса валидации, вызов валидации
const ProfileValidator = new FormValidator(formClassNames, popupProfileForm);
const CardsValidator = new FormValidator(formClassNames, popupCardsForm);
const AvatarValidator = new FormValidator(formClassNames, popupAvatarEditForm);
ProfileValidator.enableValidation();
CardsValidator.enableValidation();
AvatarValidator.enableValidation();

// Экземпляры классов попапов

// Попап фото
const popupPhoto = new PopupWithImage(popupPhotoSelector);

// Класс с инфо о пользователе
const userInfo = new UserInfo(profileNameSelector, profileJobSelector, profileAvatarSelector, popupProfileNameSelector, popupProfileJobSelector);


// Класс попапа профиля
const popupProfile = new PopupWithForm({
  popupSelector: popupProfileSelector,
  submitForm: (values) => {
    popupProfile.changeButtonOnUpload();
    userInfo.setUserInfo(values['input-name'], values['input-job']);
    const userData = userInfo.getUserInfo();
    PageApi.updateUser(userData)
      .then((res) => {
        popupProfile.close()
      })
  }
})
popupProfile.setEventListeners();

// Класс попапа добавления карточки
const popupCard = new PopupWithForm({
  popupSelector: popupCardSelector,
  submitForm: (values) => {
    popupCard.changeButtonOnUpload();
    PageApi.uploadCard(values['input-place'], values['input-link'])
      .then((res) => {
        const card = new Card({
          name: values['input-place'],
          link: values['input-link'],
          id: res._id,
          likes: res.likes,
          ownerID: res.owner._id,
          myID: myID,
          cardTemplateSelector: cardTemplateSelector,
          handleCardClick: (evt) => {
            popupPhoto.open(evt);
            popupPhoto.setEventListeners();
          },
          handleDeleteCard: (evt) => {
            let deleteTarget = evt.target.closest('.photo-elements__list-item')
            PopupWithConfirm.open(evt);
            PopupWithConfirm.setEventListeners();
            PopupWithConfirm.getInfo(deleteTarget, card);
          },
          handleLikeClick: (card) => {

            if (card.isLiked) {
              PageApi.disLike(card._id)
                .then((res) => {
                  card.likes = res.likes;
                  card.setLikes();
                });
            }
            else {
              PageApi.like(card._id)
                .then((res) => {
                  card.likes = res.likes;
                  card.setLikes();
                });
            }
          }
        });
        const cardElement = card.createCard();
        cardList.addItem(cardElement);
        popupCard.close();
      })
  }
});
popupCard.setEventListeners();

// Класс попапа редактирования аватара
const popupAvatarEdit = new PopupWithForm({
  popupSelector: popupAvatarEditSelector,
  submitForm: (values) => {
    popupAvatarEdit.changeButtonOnUpload();
    userInfo.setUserAvatar(values['input-avatarLink']);
    PageApi.updateUserAvatar(values['input-avatarLink'])
      .then((res) => {
        popupAvatarEdit.close();
      })
  }
})
popupAvatarEdit.setEventListeners();

// Слушатели кнопок открытия попапов профиля, редактирования аватара и добавления карточки + заполнение полей и сброс валидации при открытии

profileEditButton.addEventListener('click', function () {
  popupProfile.open.bind(popupProfile)();
  userInfo.fillUserForm();
  ProfileValidator.resetFormValidation();
});
cardAddButton.addEventListener('click', function () {
  popupCard.open.bind(popupCard)();
  CardsValidator.resetFormValidation();
});
avatarEditBtn.addEventListener('click', function () {
  popupAvatarEdit.open.bind(popupAvatarEdit)();
  AvatarValidator.resetFormValidation();
});



// Слушатель редактирования аватара
document.querySelector(profileAvatarSelector).addEventListener('mouseover', () => {
  avatarEditBtn.classList.add('profile__avatar-edit-btn_active');
})
document.querySelector(profileAvatarSelector).addEventListener('mouseout', () => {
  avatarEditBtn.classList.remove('profile__avatar-edit-btn_active');
})
