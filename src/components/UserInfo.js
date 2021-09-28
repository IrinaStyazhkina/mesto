export default class UserInfo {
  constructor(nameSelector, activitySelector) {
    this._nameField = document.querySelector(nameSelector);
    this._activityField = document.querySelector(activitySelector);
  }

  getUserInfo() {
    return {
      name: this._nameField.textContent, 
      activity: this._activityField.textContent
    }
  }

  setUserInfo(values) {
    this._nameField.textContent = values.name;
    this._activityField.textContent = values.activity;
  }
}