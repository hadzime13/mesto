const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileNameText = profileName.textContent;
const profileJob = document.querySelector('.profile__job');
const profileJobText = profileJob.textContent;
const inputName = document.querySelector('.popup__text_el_name'); 
const inputJob = document.querySelector('.popup__text_el_job');
const editButton = document.querySelector('.edit-btn');
const form = document.querySelector('.popup__container');

console.log(profileNameText); 
console.log(profileJobText); 
console.log(inputName);

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
form.addEventListener('submit', formSubmit);


console.log(profileName.textContent);
console.log(profileJob.textContent);
