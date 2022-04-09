export class UserInfo {
    constructor( nameSelector, aboutSelector, avatarSelector ) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._info = {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src
        }

        return this._info;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._about.textContent = data.about;
        this._avatar.src = data.avatar;
    }
}