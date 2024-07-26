//actions
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user,
  });
  
  // actions.js

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  };
};
