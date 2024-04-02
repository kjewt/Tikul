import { useQueryClient } from 'react-query';
import { EditInfo } from '../components/setting/EditInfo';
import { RegisterInfo } from '../components/setting/RegisterInfo';
import type { AccountDataType } from '../types/Types';

const Setting = (): JSX.Element => {
    const queryClient = useQueryClient()
    const freshAccountData = queryClient.getQueryData<AccountDataType>("fetchAccountData");
    if (!freshAccountData) return (<div className="flex justify-center p-3">로그인이 필요한 서비스입니다.</div>)


    return (
        <>
            {freshAccountData.IsRegister ? <EditInfo /> : <RegisterInfo />}
        </>
    );
};

export default Setting;
