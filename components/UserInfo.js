export default class UserInfo {
  constructor(userNameSelector, userInfoSelector) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
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

}