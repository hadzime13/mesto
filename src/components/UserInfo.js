export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector, popupNameSelector, popupInfoSelector) {
    this._userNameContainer = document.querySelector(userNameSelector);
    this._userInfoContainer = document.querySelector(userInfoSelector);
    this._userAvatarContainer = document.querySelector(userAvatarSelector);
    
  }
  // Метод сбора инфо о пользователе
  getUserInfo() {
    return {
      name: this._userNameContainer.textContent,
      info: this._userInfoContainer.textContent
    }
  
  }
  // Метод изменения инфо о пользователе на странице
  setUserInfo({name, about}) {
    this._userNameContainer.textContent = name;
    this._userInfoContainer.textContent = about;
    
  }

  setUserAvatar(newUserAvatar) {
    this._userAvatarContainer.style.backgroundImage = `url(${newUserAvatar})`;
  }
}