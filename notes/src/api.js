function fetchAbsolute(baseUrl) {
  return (url, ...otherParams) => url.startsWith('/') ? fetch(baseUrl + url, ...otherParams) : fetch(url, ...otherParams);
}

const fetcher = fetchAbsolute(process.env.VUE_APP_API_URL);

async function reg(userToReg) {
  console.log('reg', userToReg);
  const currentUsers = JSON.parse(localStorage.getItem('users') || '[]');

  if (!currentUsers.length) {
    pushUserToLS(userToReg);
    return {success: 'Пользователь зарегистрирован'};
  }

  const isExist = currentUsers.some(user => user.email === userToReg.email);

  if (isExist) {
    return {error: 'Данный пользователь уже есть в системе'};
  } else {
    pushUserToLS(userToReg);
    return {success: 'Пользователь зарегистрирован'};
  }

  function pushUserToLS(userToReg) {
    currentUsers.push(userToReg);
    localStorage.setItem('users', JSON.stringify(currentUsers));
  }
}

async function login(userToAuth) {
  console.log('user', userToAuth);

  const currentUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const foundUser = currentUsers.find(user => user.email === userToAuth.email);

  if (!foundUser) {
    return {error: 'Данный пользователь не зарегистрирован'};
  }

  const authUser = getAuthUser();
  if (!authUser) {
    if ((foundUser.email === userToAuth.email) && (foundUser.password === userToAuth.password)) {
      localStorage.setItem('authUser', JSON.stringify(userToAuth));
      return {success: 'Пользователь авторизован'};
    } else {
      return {error: 'Неверный логин и/или пароль'};
    }
  } else {
    if ((authUser.email === userToAuth.email) && (authUser.password === userToAuth.password)) {
      return {success: 'Пользователь уже авторизован'};
    } else {
      return {error: 'Неизвестная ошибка'};
    }
  }
}

function getAuthUser() {
  return JSON.parse(localStorage.getItem('authUser'));
}

function removeAuthUser() {
  localStorage.removeItem('authUser');
}

async function sendNote(note) {
  const response = await fetcher('/notes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(note)
  });

  return response.json();
}

async function fetchNotes() {
  const response = await fetcher('/notes');
  return response.json();
}

async function fetchNote(id) {
  const response = await fetcher(`/notes/${id}`);
  return response.json();
}

async function updateNote(id, note) {
  const response = await fetcher(`/notes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(note)
  });

  return response.json();
}

function deleteNote(id) {
  return fetcher(`/notes/${id}`, {
    method: 'DELETE',
  });
}

export {reg, login, getAuthUser, removeAuthUser, sendNote, fetchNotes, fetchNote, updateNote, deleteNote};