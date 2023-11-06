import HttpClient from "./HttpClient";

class MainApi {
  constructor(options) {
    this._httpClient = new HttpClient(options);
  }

  login(email, password) {
    return this._httpClient.post('/signin', {
      body: JSON.stringify({email, password}),
    });
  }

  register(email, password, name) {
    return this._httpClient.post('/signup', {
      body: JSON.stringify({email, password, name}),
    });
  }

  getMe() {
    return this._httpClient.get('/users/me');
  }

  patchMe({name, email}) {
    return this._httpClient.patch('/users/me', {
      body: JSON.stringify({email, name})
    })
  }

  getMovies() {
    return this._httpClient.get('/movies')
  }

  postMovie(data) {
    return this._httpClient.post('/movies', {
      body: JSON.stringify(data)
    })
  }

  deleteMovie(id) {
    return this._httpClient.delete(`/movies/${id}`)
  }

  setToken(token) {
    this._httpClient.setHeader('Authorization', `Bearer ${token}`)

    return this;
  }
}

const instance = new MainApi({
  baseUri: process.env.REACT_APP_BACKEND_URL || 'https://api.lapaliv.com',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

export default instance;
