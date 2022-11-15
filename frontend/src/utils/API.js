class API {
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

    initializeProfile() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            credentials: this._credentials
        }).then(this._checkResponse);
    }

    initialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            credentials: this._credentials
        }).then(this._checkResponse);
    }

    addCard(formValues) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(formValues),
            credentials: this._credentials
        }).then(this._checkResponse);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: this._credentials
        }).then(this._checkResponse);
    }

    toggleLike(id, isLiked) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers,
            credentials: this._credentials
        }).then(this._checkResponse);
    }

    updateUserInfo(formValues) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(formValues),
            credentials: this._credentials
        }).then(this._checkResponse);
    }

    updateUserAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar),
            credentials: this._credentials
        }).then(this._checkResponse);
    }
}

export const api = new API();
