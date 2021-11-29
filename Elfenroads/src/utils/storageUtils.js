export const getUser = () => JSON.parse(localStorage.getItem('user'));

export const storeUser = (user) => {
    localStorage.setItem('user', JSON.stringify({access_token: user.access_token, name: user.lsUser.name}));
};
