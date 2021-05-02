function fetchAbsolute(baseUrl) {
  return (url, ...otherParams) => url.startsWith('/') ? fetch(baseUrl + url, ...otherParams) : fetch(url, ...otherParams);
}

const fetcher = fetchAbsolute(process.env.VUE_APP_API_URL);

async function reg(user) {
  const response = await fetcher('/register/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  const result = await response.json();

  if (response.status !== 201) {
    throw new Error(result);
  }

  return result;
}

async function login(user) {
  const response = await fetcher('/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
  });

  const result = await response.json();

  if (response.status !== 200) {
    throw new Error(result);
  }

  if (result.accessToken) {
    const authUser = {
      accessToken: result.accessToken,
      email: user.email,
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