// Переменные
// для попапа
const popup = document.querySelector('.popup');
// для имени и профессии в профайле и их текста
const profileName = document.querySelector('.profile__name');
const profileNameText = profileName.textContent;
const profileJob = document.querySelector('.profile__job');
const profileJobText = profileJob.textContent;
// для полей ввода в попапе 
const inputName = document.querySelector('.popup__text_el_name'); 
const inputJob = document.querySelector('.popup__text_el_job');
// для кнопок попапа 
const editButton = document.querySelector('.edit-btn');
const closeButton = document.querySelector('.popup__closebtn');
//для формы попапа
const form = document.querySelector('.popup__container');

// Фукнкция открытия/закрытия Попапа
function popupOpenClose() {
  if (popup.classList.contains('popup_opened') {
    popup.classList.remove('popup_opened');
  }
  else { 
    popup.classList.add('popup_opened');
    inputName.value = profileNameText;
    inputJob.value = profileJobText;
  }
}
// Функция сохранения значений, введенных в попап  
function formSubmit(evt) {
  evt.preventDefault();
  profileName.I = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpenClose);
closeButton.addEventListener('click', popupOpenClose);
form.addEventListener('submit', formSubmit);
