export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector, popupNameSelector, popupInfoSelector) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._popupNameSelector = popupNameSelector;
    this._popupInfoSelector = popupInfoSelector;
    this._userAvatarSelector = userAvatarSelector;
  }
  // Метод сбора инфо о пользователе
  getUserInfo() {
    this._user = {
      name: document.querySelector(this._userNameSelector).textContent,
      info: document.querySelector(this._userInfoSelector).textContent
    }
    return this._user;
  }
  // Метод изменения инфо о пользователе на странице
  setUserInfo(newUserName, newUserInfo) {
    document.querySelector(this._userNameSelector).textContent = newUserName;
    document.querySelector(this._userInfoSelector).textContent = newUserInfo;
    
  }

  setUserAvatar(newUserAvatar) {
    document.querySelector(this._userAvatarSelector).style.backgroundImage = `url(${newUserAvatar})`;
  }
  fillUserForm() {
    const user = this.getUserInfo();
    document.querySelector(this._popupNameSelector).value = user.name;
    document.querySelector(this._popupInfoSelector).value = user.info;

  }
}