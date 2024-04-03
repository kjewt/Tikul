import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TransferList } from './TransferList';
import { Alert } from '../common/Alert';
import { NumberFormat } from '../../business/NumberFormat';
import { useQuery } from "react-query"
import { Api_Update } from '../../api/InfoUtils';
import type { AccountDataType } from '../../types/Types';
import { initialAccountData } from '../../state/staticData';

export const fetchAccountData = async (): Promise<AccountDataType> => {
    const userUid = localStorage.getItem("uid")
    if (userUid) {
        const data = await Api_Update(userUid);
        return data as AccountDataType
    }
    return initialAccountData
};

export const Banking = (): JSX.Element => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const { data: freshAccountData } = useQuery<AccountDataType>("fetchAccountData", fetchAccountData)

    if (!freshAccountData) return (<span> 데이터를 불러올 수 없습니다.</span>)



    const copyToClipboard = async () => {
        try {
            const infoToCopy = `${freshAccountData.bank} ${freshAccountData.name} ${freshAccountData.account}`;
            await navigator.clipboard.writeText(infoToCopy);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        } catch (error) {
            console.error('클립보드 복사 실패:', error);
            alert('계좌 정보를 수동으로 복사해주세요.');
        }
    };

    return (
        <div className="container min-h-screen">
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <p className="py-3">Banking</p>
                </div>
                {isCopied && <Alert content="복사가 완료되었습니다!" />}
                <div className="card w-full mb-10 bg-accent shadow-xl">
                    <div className="m-3 rounded-xl bg-base-100">
                        <button className="user-account p-7 sm:p-4 text-sm badge badge-secondary m-4 cursor-pointer" onClick={copyToClipboard}>
                            <div className="flex flex-col sm:flex-row">
                                <span className="p-1">{freshAccountData.bank}</span>
                                <span className="p-1">{freshAccountData.account}</span>
                            </div>
                        </button>
                        <div className="account-balance px-4 text-right text-xl">{NumberFormat(freshAccountData.balance)}원</div>
                        <div className="btn-banking p-4">
                            <Link to="/home/transfer" className="btn btn-primary text-base-100 w-full">송금</Link>
                        </div>
                    </div>
                    <TransferList />
                </div>


            </div>
        </div>
    );
};
