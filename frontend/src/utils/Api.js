class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {//проверка на ошибку
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() { //для получения данных о пользователе
    const token = localStorage.getItem('token');
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponse(res));
  }

  getCardsInfo() { //для получения карточек с сервера
    const token = localStorage.getItem('token');
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponse(res));
  }

  setUserEdit(item) { //для изменения профиля
    const token = localStorage.getItem('token');
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: item.name, about: item.about })
    }).then((res) => this._getResponse(res));
  }

  setAvatarEdit({avatar}) { //для изменения аватара
    const token = localStorage.getItem('token');
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatar: avatar })
    }).then((res) => this._getResponse(res));
  }

  createNewCards ({name, link}) { //для добавления новой карточки
    const token = localStorage.getItem('token');
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: name, link: link })
    }).then((res) => this._getResponse(res));
  }

  delCard(cardId){ //для удаления карточки
    const token = localStorage.getItem('token');
    return fetch (`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponse(res));
  }

  _addLike(cardId) { //для добавления лайков
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponse(res));
  }

  _removeLike(cardId) { //для удаления лайков
    const token = localStorage.getItem('token');
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponse(res));
  }

  toggleLike(cardId, isLike) {
    return isLike ? this._removeLike(cardId) : this._addLike(cardId); //аналог записи в комменте ниже
    // if (isLike) {
    //   return this._removeLike(cardId);
    // } else {
    //   return this._addLike(cardId);
    // }
  }
}

const api = new Api({
  url: 'https://aaa2208bek.nomoredomains.work',
  },
);

export default api;