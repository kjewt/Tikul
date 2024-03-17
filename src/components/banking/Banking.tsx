import { Link } from 'react-router-dom';
import { TransferList } from './TransferList';
import { Alert } from '../common/Alert';
import { NumberFormat } from '../../business/NumberFormat';
import { useRecoilState } from 'recoil';
import { accountDataState } from "../../state/atoms";
import { useState } from 'react';

export const Banking = (): JSX.Element => {
    const [accountData] = useRecoilState(accountDataState);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    console.log(accountData)
    const copyToClipboard = async () => {
        try {
            const infoToCopy = `${accountData.bank} ${accountData.name} ${accountData.account}`;
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
                        <button className="user-account p-4 text-sm badge badge-secondary m-4 cursor-pointer" onClick={copyToClipboard}>
                            <span>{accountData.name}님의 계좌 |</span>
                            <span className="p-1">{accountData.bank}</span>
                            <span className="p-1">{accountData.account}</span>
                        </button>
                        <div className="account-balance px-4 text-right text-xl">{NumberFormat(accountData.balance)}원</div>
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
