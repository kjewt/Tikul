import { useQueryClient } from 'react-query';
import { EditInfo } from '../components/setting/EditInfo';
import { RegisterInfo } from '../components/setting/RegisterInfo';
import type { AccountDataType } from '../types/Types';

const Setting = (): JSX.Element => {
    const queryClient = useQueryClient()
    const freshAccountData = queryClient.getQueryData<AccountDataType>("fetchAccountData");


    return (
        <>
            {freshAccountData?.IsRegister ? <EditInfo /> : <RegisterInfo />}
        </>
    );
};

export default Setting;
