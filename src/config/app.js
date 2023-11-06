export const NAME_PATTERN = /^[a-zа-яё][a-zа-яё -]+[a-zа-яё]$/i
export const EMAIL_PATTERN = /^[a-z0-9]+(?:[-.][_a-z0-9]+)?@[a-z0-9]+(?:[-a-z0-9]+)?\.[a-z]{2,}$/i

export const NAVIGATION_LINKS = [
  {to: '/', title: 'Главная'},
  {to: '/movies', title: 'Фильмы'},
  {to: '/favorites', title: 'Сохраненные фильмы'},
];
