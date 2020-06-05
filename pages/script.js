
// *** Попап редактирования профиля

// Переменные
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

// Функция открытия/закрытия попапов

const popupOpenClose = (element) => {
  element.classList.toggle('popup_opened');
}

// Функция заполнения полей попапа профиля

const profileEdit = () => {
  popupOpenClose(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

// Функция сохранения значений, введенных в попап профиля  
const profileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupOpenClose(popupProfile);
}
// "Слушатели" попапа профиля
editButton.addEventListener('click', profileEdit);
closeButton.addEventListener('click', function () { popupOpenClose(popupProfile) });
profileForm.addEventListener('submit', profileFormSubmit);

// *** Загрузка/редактирование карточек мест

// Переменные
// для шаблона карточки и списка, куда добавляем карточки
const cardTemplate = document.querySelector('.template-photo').content;
const cardsArea = document.querySelector('.photo-elements__list');
// Первоначальный массив карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
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

// Загружаем первые 6 карточек из массива
initialCards.forEach(elem => {
  cardsArea.prepend(createCard(elem.name, elem.link));
});

// // *** Попап добавления карточки 

// Переменные

const popupAddCards = document.querySelector('.popup_cards');
// для полей ввода в попапе добавления карточек
const inputCardName = popupAddCards.querySelector('.popup__text_el_place');
const inputCardLink = popupAddCards.querySelector('.popup__text_el_image-link');
// для кнопок попапа редактирования профиля
const addButton = document.querySelector('.profile__add-btn');
const cardsCloseButton = popupAddCards.querySelector('.popup__close-btn');
//для формы попапа редактирования профиля
const cardAddForm = popupAddCards.querySelector('.popup__container');

// Функции добавления карточки пользователем

const cardPopupOpen = () => {
  inputCardLink.value = '';
  inputCardName.value = '';
  popupOpenClose(popupAddCards);
}

const cardsFormSubmit = (evt) => {
  evt.preventDefault();
  cardsArea.prepend(createCard(inputCardName.value, inputCardLink.value));
  popupOpenClose(popupAddCards);
};

// Слушатели попапа добавления карточек

addButton.addEventListener('click', cardPopupOpen);
cardsCloseButton.addEventListener('click', function () { popupOpenClose(popupAddCards) });
cardAddForm.addEventListener('submit', cardsFormSubmit);

// *** Попап с фото
// Переменные

const popupPhoto = document.querySelector('.popup_photo');
const photoCloseButton = popupPhoto.querySelector('.popup__close-btn');

// Функция попапа с фото

function photoPopupOpen(evt) {
  evt.preventDefault();
  popupPhoto.querySelector('.popup__image').src = evt.target.src;
  popupPhoto.querySelector('.popup__image').alt = evt.target.alt;
  popupPhoto.querySelector('.popup__photo-name').textContent = evt.target.nextElementSibling.textContent;
  popupOpenClose(popupPhoto);
}

// Слушатель закрытия попапа с фото
photoCloseButton.addEventListener('click', function () { popupOpenClose(popupPhoto) });