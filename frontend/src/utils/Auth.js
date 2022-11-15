class Auth {
    constructor() {
        this._url = "https://api.mesta.nomoredomains.icu";
        this._headers = {'Content-Type': 'application/json'};
        this._credentials = 'include';
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}.`);
        }
    }

    register(email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({email, password}),
            credentials: this._credentials
        }).then(this._checkResponse);
    }

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({email, password}),
            credentials: this._credentials
        }).then(this._checkResponse);
    };

    checkToken() {
        return fetch(`${this._url}/users/me`, {
            headers: {'Content-Type': 'application/json'},
            credentials: this._credentials
        }).then(this._checkResponse);
    };
}

export const auth = new Auth();
