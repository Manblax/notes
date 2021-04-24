function guest({next, router}) {
  const authUser = JSON.parse(localStorage.getItem('authUser'));
  console.log('authUser', authUser)
  if (!authUser) {
    return router.push({name: 'Login'});
  }
  return next();
}

export {guest};