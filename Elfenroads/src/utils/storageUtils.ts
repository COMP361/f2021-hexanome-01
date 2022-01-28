export const getUser = () => JSON.parse(localStorage.getItem('user') as string);

export const storeUser = (user: any) => {
  localStorage.setItem(
    'user',
    JSON.stringify({access_token: user.access_token, name: user.lsUser.name})
  );
};
