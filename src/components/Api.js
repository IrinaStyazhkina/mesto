export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._token = options.token;
    }

    // users/me

    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            "method": "GET",
            "headers": {
                "authorization": `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status + " " + res.statusText);
        })
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            "method": "PATCH",
            "headers": {
                "authorization": `${this._token}`,
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                name: `${name}`,
                about: `${about}`
            })
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status + " " + res.statusText);
        })
    }

    editAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            "method": "PATCH",
            "headers": {
                "authorization": `${this._token}`,
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                avatar: `${avatarLink}`
            })
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status + " " + res.statusText);
        })
    }

    // cards

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            "method": "GET",
            "headers": {
                "authorization": `${this._token}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status + " " + res.statusText);
        })
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            "method": "POST",
            "headers": {
                "authorization": `${this._token}`,
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                name: `${name}`,
                link: `${link}`
            })
        }).then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status + " " + res.statusText);
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            "method": "DELETE",
            "headers": {
                "authorization": `${this._token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status + " " + res.statusText);
        })
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            "method": "PUT",
            "headers": {
                "authorization": `${this._token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status + " " + res.statusText);
        })
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            "method": "DELETE",
            "headers": {
                "authorization": `${this._token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(res.status + " " + res.statusText);
        })
    }

    _handleServerResponse (res) {
        if(res.ok) {
            return res.json();
        }
        return Promise.reject(res.status + " " + res.statusText);
    }
}