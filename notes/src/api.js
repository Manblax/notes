import wretch from "wretch"

const authMiddleware = next => (url, opts) => {
  const user = getAuthUser();
  if (user?.token) {
    if (opts.headers) {
      opts.headers['Authorization'] = `Token ${user.token}`;
    } else {
      opts.headers = {'Authorization': `Token ${user.token}`};
    }
  }
  return next(url, opts);
};


/**
 * @description Дефолтный конфиг wretch
 */

const fetcher = wretch(process.env.VUE_APP_API_URL).middlewares([authMiddleware]);

async function reg(user) {
  const response = await fetcher.url('/auth/users/').json(user).post().res();
  const result = await response.json();

  if (response.status !== 201) {
    throw new Error(result);
  }

  return result;
}

async function me() {
  return fetcher.url('/auth/users/me/').get().json();
}

async function login(user) {
  const response = await fetcher.url('/auth/token/login/').json(user).post().res();
  console.log('response', response)
  const result = await response.json();

  if (response.status !== 200) {
    throw new Error(result.detail);
  }

  if (result.auth_token) {
    const authUser = {
      token: result.auth_token,
      email: user.username,
    }
    localStorage.setItem('authUser', JSON.stringify(authUser));
  } else {
    throw new Error('Нет токена');
  }

  return result;
}

function getAuthUser() {
  return JSON.parse(localStorage.getItem('authUser'));
}

function removeAuthUser() {
  localStorage.removeItem('authUser');
}

async function sendNote(note) {
  return fetcher.url('/notes/').body(note).post().json();
}

async function fetchNotes() {
  return fetcher.url('/notes/').get().json();
}

async function fetchNote(id) {
  return fetcher.url(`/notes/${id}/`).get().json();
}

async function updateNote(id, note) {
  return fetcher.url(`/notes/${id}/`).body(note).patch().json();
}

function deleteNote(id) {
  return fetcher.url(`/notes/${id}/`).delete().res();
}

export {reg, login, getAuthUser, removeAuthUser, sendNote, fetchNotes, fetchNote, updateNote, deleteNote, me};