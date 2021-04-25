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

  if (foundUser) {
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    if (!authUser) {
      if ((foundUser.email === userToAuth.email) && (foundUser.password === userToAuth.password)) {
        localStorage.setItem('authUser', JSON.stringify(userToAuth));
        return {success: 'Пользователь авторизован'};
      } else {
        return {error: 'Неверный логин и/или пароль'};
      }
    } else {
      if ((authUser.email === userToAuth.email) && (authUser.password === userToAuth.password)) {
        return {auth: 'Пользователь уже авторизован'};
      } else {
        return {error: 'Неизвестная ошибка'};
      }
    }
  } else {
    return {error: 'Данный пользователь не зарегистрирован'};
  }
}

export {reg, login};