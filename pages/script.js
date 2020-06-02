
// *** Попап редактирования профиля

// Переменные
// для попапа 
const popup = document.querySelector('.popup');
// для имени и профессии в профиле
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// для полей ввода в попапе рекдактирования профиля
const inputName = document.querySelector('.popup__text_el_name'); 
const inputJob = document.querySelector('.popup__text_el_job');
// для кнопок попапа редактирования профиля
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-btn');
//для формы попапа редактирования профиля
const form = document.querySelector('.popup__container');

// Фукнкция открытия/закрытия Попапа
function popupOpenClose() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  }
  else { 
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputJob.value = profileJob.textContent;
  }
}
// Функция сохранения значений, введенных в попап профиля  
function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupOpenClose();
}
// "Слушатели" попапа профиля
editButton.addEventListener('click', popupOpenClose);
closeButton.addEventListener('click', popupOpenClose);
form.addEventListener('submit', formSubmit);

//*** Загрузка/редактирование карточек мест

// Переменные
// для шаблона карточки и списка, куда добавляем карточки
const cardTemplate = document.querySelector('.photo-element').content;
const cardsArea = document.querySelector('photo-elements__list');
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
// Функция первоначальной загрузки карточек

const addInitialCards = (cardsArray) => {
  for (let elem of cardsArray) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.photo-elements__image').src = elem.link;
    cardElement.querySelector('.photo-elements__image').alt = elem.name;
    cardElement.querySelector('.photo-elements__name').textContent = elem.name;
    cardsArea.append(cardElement);
  };
};

addInitialCards(initialCards);
