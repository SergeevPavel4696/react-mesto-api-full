class Auth {
    constructor() {
        this._url = "https://auth.nomoreparties.co";
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log(response);
            return Promise.reject(`Ошибка: ${response.status}.`);
        }
    }

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }).then(response => this._checkResponse(response));
    }

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        }).then(response => this._checkResponse(response));
    };

    checkToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(response => this._checkResponse(response));
    };
}

export const auth = new Auth();
