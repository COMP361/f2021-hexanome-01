export const getUser = () => JSON.parse(localStorage.getItem('user') || '');

export const storeUser = (user: any, password: any) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      accessToken: user.access_token,
      name: user.lsUser.name,
      password: password,
    })
  );
};

export const getSessionId = () => localStorage.getItem('sessionId');
export const getGame = () => localStorage.getItem('game');

export const storeSessionId = (id: any, game: any, cb: any) => {
  localStorage.setItem('sessionId', id);
  localStorage.setItem('game', game);
  if (cb) cb();
};

export const storeSession = (session: any, cb: any) => {
  console.log(session);
  localStorage.setItem('session', JSON.stringify(session));
  if (cb) cb();
};

export const getSession = () =>
  JSON.parse(localStorage.getItem('session') || '');

export const colors = ['green', 'blue', 'purple', 'red', 'yellow', 'black'];
