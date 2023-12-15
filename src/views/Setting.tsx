// import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';
import { NavBar } from "../components/common/NavBar";
import { EditInfo } from '../components/setting/EditInfo';
import { RegisterInfo } from '../components/setting/RegisterInfo';

const Setting = (): JSX.Element => {
    const [accountData] = useRecoilState(accountDataState);

    return (
        <>
            <NavBar />
            {accountData.IsRegister ? <EditInfo /> : <RegisterInfo />}
        </>
    );
};

export default Setting;
