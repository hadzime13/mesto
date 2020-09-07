export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, popupNameSelector, popupInfoSelector) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._popupNameSelector = popupNameSelector;
    this._popupInfoSelector = popupInfoSelector;
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
  fillUserForm() {
    const user = this.getUserInfo();
    document.querySelector(this._popupNameSelector).value = user.name;
    document.querySelector(this._popupInfoSelector).value = user.info;

  }
}