import { useRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';
export const resetState = () => {
    const [, setAccountData] = useRecoilState(accountDataState);

    const reset = () => {
        const initialAccountData = {
            IsRegister: false,
            account: null,
            accountPW: null,
            balance: 0,
            bank: null,
            email: null,
            name: null,
        };
        setAccountData(initialAccountData);
    };

    return { reset };
};
