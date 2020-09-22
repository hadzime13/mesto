export default class UserInfo {
  constructor(userNameSelector, userInfoSelector, userAvatarSelector, popupNameSelector, popupInfoSelector) {
    this._userNameSelector = userNameSelector;
    this._userInfoSelector = userInfoSelector;
    this._popupNameSelector = popupNameSelector;
    this._popupInfoSelector = popupInfoSelector;
    this._userAvatarSelector = userAvatarSelector;
    this._userNameContainer = document.querySelector(this._userNameSelector);
    this._userInfoContainer = document.querySelector(this._userInfoSelector);
    this._userAvatarContainer = document.querySelector(this._userAvatarSelector);
    this._popupUserInput = document.querySelector(this._popupNameSelector);
    this._popupInfoInput = document.querySelector(this._popupInfoSelector);
  }
  // Метод сбора инфо о пользователе
  getUserInfo() {
    this._user = {
      name: this._userNameContainer.textContent,
      info: this._userInfoContainer.textContent
    }
    return this._user;
  }
  // Метод изменения инфо о пользователе на странице
  setUserInfo(newUserName, newUserInfo) {
    this._userNameContainer.textContent = newUserName;
    this._userInfoContainer.textContent = newUserInfo;

  }

  setUserAvatar(newUserAvatar) {
    this._userAvatarContainer.style.backgroundImage = `url(${newUserAvatar})`;
  }
  fillUserForm() {
    const user = this.getUserInfo();
    this._popupUserInput.value = user.name;
    this._popupInfoInput.value = user.info;
  }
}