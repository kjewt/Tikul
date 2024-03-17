// import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';
import { EditInfo } from '../components/setting/EditInfo';
import { RegisterInfo } from '../components/setting/RegisterInfo';

const Setting = (): JSX.Element => {
    const [accountData] = useRecoilState(accountDataState);

    return (
        <>
            {accountData.IsRegister ? <EditInfo /> : <RegisterInfo />}
        </>
    );
};

export default Setting;
