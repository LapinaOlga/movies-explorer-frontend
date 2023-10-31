export default class Toast {
  constructor(type, message) {
    this._id = String(Math.random()).replace('.', '')

    if (type === 'green') {
      this._type = type;
    } else {
      this._type = 'red';
    }

    this._message = message
  }

  getId() {
    return this._id
  }

  getType() {
    return this._type
  }

  getTitle() {
    if (this._type === 'green') {
      return 'Успешно'
    }

    return 'Ошибка'
  }

  getMessage() {
    return this._message
  }
}
