import HttpClient from "./HttpClient";

class MoviesApi {
  constructor(options) {
    this._httpClient = new HttpClient(options);
  }

  getAll() {
    return this._httpClient.get('/beatfilm-movies')
  }
}

const instance = new MoviesApi({
  baseUri: process.env.REACT_APP_MOVIES_LIBRARY_URL,
})

export default instance;
