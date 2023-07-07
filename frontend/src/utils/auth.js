export const url = 'https://aaa2208bek.nomoredomains.work';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(checkResponse);
}

export const authorize = (email, password) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkResponse)
  // .then((data) => {
  //   if(data.token) {
  //     localStorage.setItem('token', data.token);
  //     return data;
  //   }
  // })
}

export const checkToken = () => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      }
  })
  .then(checkResponse)
}