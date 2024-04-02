
import { Background } from "../common/Background";
import { FaIdCard } from "react-icons/fa";
import { CardSection } from "./CardSection";
import { BtnEdit } from "./BtnEdit";
import { useQueryClient } from "react-query";
import type { AccountDataType } from "../../types/Types";



export const EditInfo = () => {
    const queryClient = useQueryClient();
    const freshAccountData = queryClient.getQueryData<AccountDataType>("fetchAccountData");
    if (!freshAccountData) return (<div className="flex justify-center p-3">계좌 정보가 없습니다.</div>)

    return (<>
        <Background margin="mt-12">
            <div className="flex justify-center items-center gap-2 mb-4">

                <FaIdCard className="text-xl" />
                <div className="text-xl flex items-center">등록 계좌</div>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <CardSection name={freshAccountData.name} bank={freshAccountData.bank} balance={freshAccountData.balance} account={freshAccountData.account} />
                <BtnEdit pw={freshAccountData.accountPW} />
            </div>
        </Background>

    </>)
}