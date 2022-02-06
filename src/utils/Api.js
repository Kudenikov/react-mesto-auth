class Api {
    constructor({address, token}) {
        this.address = address;
        this.token = token;
    }

    _checkResponse(result) {
        if (result.ok) {
            return result.json()
        } else {
            return Promise.reject(`Ошибка: ${result.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this.address}/users/me`, {
            method: 'GET',
            headers: {
                'authorization': this.token
            }
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this.address}/cards`, {
            method: 'GET',
            headers: {
                'authorization': this.token
            }
        })
        .then(this._checkResponse)
    }

    updateUserInfo(data) {
        return fetch(`${this.address}/users/me`, {
            method: 'PATCH',
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data['name'],
                about: data['about']
            })
        })
        .then(this._checkResponse)
    }

    addNewCard(card) {
        return fetch(`${this.address}/cards`, {
            method: 'POST',
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this.address}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'authorization': this.token
            }
        })
        .then(this._checkResponse)
    }
    
    setLike(cardId) {
        return fetch(`${this.address}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'authorization': this.token
            }
        })
        .then(this._checkResponse)
    }

    removeLike(cardId) {
        return fetch(`${this.address}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'authorization': this.token
            }
        })
        .then(this._checkResponse)
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return this.removeLike(cardId) 
        } else {
            return this.setLike(cardId)
        }
    }

    updateAvatar(data) {
        return fetch(`${this.address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'authorization': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data['avatar']
            })
        })
        .then(this._checkResponse)
    }
}

const api = new Api({
    address: 'https://nomoreparties.co/v1/cohort-32',
    token: '177d42c6-9819-4203-8638-327e1c972af4'
  });

export default api;