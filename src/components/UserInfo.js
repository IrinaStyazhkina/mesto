export default class UserInfo {
  constructor(nameSelector, activitySelector, avatarSelector) {
    this._nameField = document.querySelector(nameSelector);
    this._activityField = document.querySelector(activitySelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameField.textContent, 
      activity: this._activityField.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(data) {
    this._nameField.textContent = data.name;
    this._activityField.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}