export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }
  // Метод обработки ответа
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(res.statusText);
  }

  // Метод обработки ошибки запроса
  _handleResponseError(err) {
    console.log(`Error,${err}`);
    return Promise.reject(err['message']);
  }

  // Получение инфо о пользователе
  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    },
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
// Не совсем понял замечание - поясните пжта, в catch выполняется _handleResponseError,
// т,е выводится в консоль ошибка, а зачем возвращается Promise.reject. (т.е прерывается).
// во всех методах - аналогично.



  // Обновление данных пользователя
  updateUser(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData['name'],
        about: userData['info']
      })
    },
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // Обновление аватара
  updateUserAvatar(newAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar,
      })
    },
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // Загрузка массива карточек с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    },
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  // Добавление карточки
  uploadCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    },
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
  // Удаление карточки 
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    },
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
  // Методы лайков

  like(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    },
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }

  disLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    },
    )
      .then(this._handleResponse)
      .catch(this._handleResponseError)
  }
}

