function auth() {
  return JSON.parse(localStorage.getItem('authUser'));
}

export {auth};