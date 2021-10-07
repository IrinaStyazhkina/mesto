export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    // users/me

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            "method": "GET",
            "headers": this._headers
        })
        .then(this._handleServerResponse)
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            "method": "PATCH",
            "headers": this._headers,
            "body": JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
        })
        .then(this._handleServerResponse)
    }

    editAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            "method": "PATCH",
            "headers": this._headers,
            "body": JSON.stringify({
                avatar: `${avatarLink}`
            })
        })
        .then(this._handleServerResponse)
    }

    // cards

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            "method": "GET",
            "headers": this._headers
        })
        .then(this._handleServerResponse)
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            "method": "POST",
            "headers": this._headers,
            "body": JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        })
        .then(this._handleServerResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            "method": "DELETE",
            "headers": this._headers
        })
        .then(this._handleServerResponse)
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            "method": "PUT",
            "headers": this._headers
        })
        .then(this._handleServerResponse)
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            "method": "DELETE",
            "headers": this._headers
        })
        .then(this._handleServerResponse)
    }

    _handleServerResponse(res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(res.status + " " + res.statusText);
    }
}