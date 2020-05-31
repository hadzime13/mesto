// Переменные
// для попапа
const popup = document.querySelector('.popup');
// для имени и профессии в профайле
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// для полей ввода в попапе 
const inputName = document.querySelector('.popup__text_el_name'); 
const inputJob = document.querySelector('.popup__text_el_job');
// для кнопок попапа 
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-btn');
//для формы попапа
const form = document.querySelector('.popup__container');

// Фукнкция открытия/закрытия Попапа
function popupOpenClose() {
  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened');
  }
  else { 
    popup.classList.add('popup_opened');
// Переменные для текста имени и профессии в профайле
    const profileNameText = profileName.textContent;
    const profileJobText = profileJob.textContent;
    inputName.value = profileNameText;
    inputJob.value = profileJobText;
  }
}
// Функция сохранения значений, введенных в попап  
function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupOpenClose();
}

editButton.addEventListener('click', popupOpenClose);
closeButton.addEventListener('click', popupOpenClose);
form.addEventListener('submit', formSubmit);
