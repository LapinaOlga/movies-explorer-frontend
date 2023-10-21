class Api {
  constructor(settings) {
    this._settings = settings;
    this._token = null;
  }

  login(email, password) {
    return this._request('POST', '/signin', {
      body: JSON.stringify({email, password}),
    });
  }

  register(email, password, name) {
    return this._request('POST', '/signup', {
      body: JSON.stringify({email, password, name}),
    });
  }

  getCurrentUser(){
    // Временный костыль для проверки верстки
    return Promise.resolve({
      data: {
        "_id": "652d98e39b20be364f6671b9",
        "email": "pochta@yandex.ru",
        "name": "Виталий"
      }
    })
    // return this._request('GET', '/users/me');
  }

  setToken(token) {
    this._token = token;

    return this;
  }

  _request(method, url, options) {
    if (!url.match(/^https/)) {
      url = `${this._settings.baseUri}${url}`
    }

    return fetch(url, {
      method,
      ...options,
      headers: {
        ...this._settings.headers,
        ...this._getAuthHeaders(),
        // ...(options.headers || {})
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return new Promise(async (resolve, reject) => {
        const responseData = await response.json();
        return reject(new Error(responseData.message));
      })
    });
  }

  _getAuthHeaders() {
    if (this._token) {
      return {
        'Authorization': `Bearer ${this._token}`,
      };
    }

    return {};
  }
}

const instance = new Api({
  baseUri: process.env.REACT_APP_BACKEND_URL || 'https://api.lapaliv.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default instance;
