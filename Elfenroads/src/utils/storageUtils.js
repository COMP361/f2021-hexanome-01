export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const storeUser = (user) => {
    localStorage.setItem('user', JSON.stringify({accessToken: user.access_token, name: user.lsUser.name}));
};

export const getSessionId = () => localStorage.getItem('sessionId');

export const storeSessionId = (id, cb) => {
    localStorage.setItem('sessionId', id);
    if (cb) cb();
};
