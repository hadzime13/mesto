const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileNameText = profileName.textContent;
const profileJob = document.querySelector('.profile__job');
const profileJobText = profileJob.textContent;
const inputName = document.querySelector('.popup__text_el_name'); 
const inputJob = document.querySelector('.popup__text_el_job');
const editButton = document.querySelector('.edit-btn');
const closeButton = document.querySelector('.popup__closebtn');
const form = document.querySelector('.popup__container');


function popupOpen() {
popup.classList.add('popup_opened');
inputName.value = profileNameText;
inputJob.value = profileJobText;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}
function formSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
form.addEventListener('submit', formSubmit);
