export const Logout = () => {
    localStorage.removeItem('account');
    localStorage.removeItem('uid');
};
