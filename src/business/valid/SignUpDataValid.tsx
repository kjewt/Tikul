export const isSignUpDataValid = (
    emailValid: boolean,
    pwValid: boolean,
    cbxValid: boolean
): boolean => {
    return emailValid && pwValid && cbxValid;
};
