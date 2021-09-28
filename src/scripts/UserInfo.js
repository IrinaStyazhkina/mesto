export default class UserInfo {
  constructor(nameSelector, activitySelector) {
    this._nameSelector = document.querySelector(nameSelector);
    this._activitySelector = document.querySelector(activitySelector);
  }

  getUserInfo() {
    return {
      name: this._nameSelector.textContent, 
      activity: this._activitySelector.textContent
    }
  }

  setUserInfo(values) {
    this._nameSelector.textContent = values.name;
    this._activitySelector.textContent = values.activity;
  }
}