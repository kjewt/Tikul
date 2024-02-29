import { Link } from 'react-router-dom';
import { TransferList } from './TransferList';
import { NumberFormat } from '../../business/NumberFormat';
// import { doc, getDoc } from 'firebase/firestore';
// import { firebaseAuth, db } from '../../../firebase';

import type { commonType } from "../../types/Types";
import { CopyAccount } from '../../business/CopyAccount';


type PropsType = {
    name: commonType;
    account: commonType;
    bank: commonType;
    balance: number;
}

export const Banking = ({ name, account, bank, balance }: PropsType): JSX.Element => {

    const handleCopy = () => {
        CopyAccount(bank, account)
    }


    return (
        <div className="container min-h-screen">
            <div className="flex flex-col items-center">
                <div className="text-center">
                    <p className="py-3">Banking</p>
                </div>

                <div className="card w-96 mb-10 bg-accent shadow-xl">
                    <div className="m-3 rounded-xl bg-base-100">
                        <div className="user-account p-4 text-sm badge badge-secondary m-4 cursor-pointer" onClick={handleCopy}>
                            <span>{name}님의 계좌 |</span>
                            <span className="p-1">{bank}</span>
                            <span className="p-1">{account}</span>
                        </div>
                        <div className="account-balance px-4 text-right text-xl">{NumberFormat(balance)}원</div>
                        <div className="btn-banking p-4 flex justify-around gap-3">
                            <Link to="/home/transfer" className="btn btn-primary text-base-100 w-1/2">송금</Link>
                            <Link to="/home/addMoney" className="btn btn-outline btn-primary w-1/2 btn-hover">충전</Link>

                        </div>
                    </div>
                    {/* 거래내역 */}
                    <TransferList />
                </div>

            </div>
        </div>
    );
};
