export const AccountPwValid = (password: string): boolean => {
    // 0~ 9까지의 6자리 수
    const passwordRegex = /^[0-9]{6}$/;
    return passwordRegex.test(password);
};
