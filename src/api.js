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

function sendNote(note) {
  const notes = getNotesFromLS();
  note.id = generateID();
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function generateID() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function fetchNotes() {
  return getNotesFromLS();
}

function fetchNote(id) {
  const notes = getNotesFromLS();
  return notes.find(note => note.id === id);
}

function getNotesFromLS() {
  return JSON.parse(localStorage.getItem('notes') || '[]');
}

function updateNote(noteToUpdate) {
  const notes = getNotesFromLS();
  const foundedNote = notes.find(note => note.id === noteToUpdate.id);
  if (!foundedNote) return;

  foundedNote.src = noteToUpdate.src;
  foundedNote.text = noteToUpdate.text;
  console.log(foundedNote === notes[0]);

  localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNote(id) {
  const notes = getNotesFromLS();
  const filteredNotes = notes.filter(note => note.id !== id);
  localStorage.setItem('notes', JSON.stringify(filteredNotes));
}

export {reg, login, getAuthUser, removeAuthUser, sendNote, fetchNotes, fetchNote, updateNote, deleteNote};