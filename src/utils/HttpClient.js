export default class HttpClient {
  constructor(options) {
    this._baseUri = options.baseUri || null;
    this._headers = options.headers || {};
  }

  setHeader(name, value) {
    this._headers = {...this._headers, [name]: value};

    return this
  }

  get(url, options){
    return this.request('GET', url, options);
  }

  post(url, options){
    return this.request('POST', url, options);
  }

  put(url, options){
    return this.request('PUT', url, options);
  }

  delete(url, options){
    return this.request('DELETE', url, options);
  }

  patch(url, options){
    return this.request('PATCH', url, options);
  }

  request(method, url, options) {
    if (!url.match(/^https/)) {
      url = `${this._baseUri}${url}`
    }

    return fetch(url, {
      method,
      ...options,
      headers: this._headers,
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
}
