import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { accountDataState } from "../../state/atoms"
import { NumberFormat } from '../../business/NumberFormat';
import type { MoneyProps } from '../../types/Types';

export const Money = ({ onMoneyChange }: MoneyProps): JSX.Element => {
    const [accountData] = useRecoilState(accountDataState);
    const [money, setMoney] = useState<number>(0);
    const isValid = money <= accountData.balance

    const handleMoneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawMoney = event.target.value.replace(/[^0-9]/g, "");
        setMoney(Number(rawMoney));
        onMoneyChange({ value: rawMoney, valid: accountData.balance >= Number(rawMoney) });
    };




    const handleMoneyAdd = (amount: number) => {
        setMoney((prevMoney) => prevMoney + amount);
        console.log("더한 돈:", { money })
        onMoneyChange({ value: String(money), valid: accountData.balance >= money })
    };

    const handleMaxAmount = () => {
        setMoney(accountData.balance);
    };

    return (
        <>
            <div>
                <label className="label">
                    <span className="label-text">입금 금액</span>

                    <span className={`label-text text-primary font-bold ${!isValid ? 'animate-bounce text-red-500' : ''}`}>
                        잔액: {NumberFormat(accountData.balance)}
                    </span>

                </label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="숫자로 작성해주세요."
                        className={`input input-bordered ${!isValid ? "input-error" : 'input-primary'}  w-full`}
                        value={NumberFormat(money)}
                        onChange={handleMoneyChange}
                    />
                    <span className="flex items-end">원</span>
                </div>
                <span className={`pt-2 pl-1 text-sm text-red-500 ${!isValid ? "" : "hidden"}`}>잔액을 확인해주세요!</span>
                <div className="flex gap-2 py-2">
                    <button className="btn btn-sm" onClick={() => handleMoneyAdd(10000)}>+1만</button>
                    <button className="btn btn-sm" onClick={() => handleMoneyAdd(100000)}>+10만</button>
                    <button className="btn btn-sm" onClick={() => handleMoneyAdd(1000000)}>+100만</button>
                    <button className="btn btn-sm" onClick={handleMaxAmount}>전액</button>
                </div>
            </div>
        </>
    );
};
