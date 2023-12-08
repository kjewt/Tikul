export const AccountValid = (account: string): boolean => {
    //계좌번호는 9~13자리의 숫자만 가능.
    const accountRegex = /^[1-9][0-9]{8,13}$/;
    return accountRegex.test(account);
}

