export const getUser = () => JSON.parse(localStorage.getItem('user') || '');

export const storeUser = (user: any) => {
  localStorage.setItem(
    'user',
    JSON.stringify({accessToken: user.access_token, name: user.lsUser.name})
  );
};

export const getSessionId = () => localStorage.getItem('sessionId');

export const storeSessionId = (id: any, cb: any) => {
  localStorage.setItem('sessionId', id);
  if (cb) cb();
};

export const colors = ['green', 'blue', 'purple', 'red', 'yellow', 'black'];
