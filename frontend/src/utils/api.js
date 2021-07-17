export default class Api {
  constructor({ adress, token, groupId }) {
    this._adress = adress;
    this._token = token;
    this._groupId = groupId;
  }

  getResponse(response) {
    return response.ok
      ? response.json()
      : Promise.reject(`Что-то пошло не так: ${response.status}`);
  }

  // загрузка информации о пользователе с сервера
  getUsersInfo() {
    return fetch(`${this._adress}${this._groupId}/users/me `, {
      headers: {
        authorization: this._token,
      },
    }).then(this.getResponse);
  }
  // загрузка карточек с сервера
  getCards() {
    return fetch(`${this._adress}${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this.getResponse);
  }

  // редактирование профиля
  editUsersProfile({ name, about }) {
    return fetch(`${this._adress}${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    }).then(this.getResponse);
  }

  // добавление новой карточки
  addCard(data) {
    return fetch(`${this._adress}${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name: data.name, link: data.link }),
    }).then(this.getResponse);
  }
  // добавление лайка карточке
  setLike(cardId) {
    return fetch(`${this._adress}${this._groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this.getResponse);
  }

  // удаление лайка карточки
  removeLike(cardId) {
    return fetch(`${this._adress}${this._groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this.getResponse);
  }

  // изменение состояния кнопки лайка
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.setLike(cardId);
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._adress}${this._groupId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this.getResponse);
  }
  // обновление аватара
  updateAvatar(url) {
    return fetch(`${this._adress}${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: url.avatar }),
    }).then(this.getResponse);
  }
}

export const api = new Api({
  adress: "http://project-mesto.nomoredomains.monster/",
});
