import { useState, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { NumberFormat } from '../../business/NumberFormat';
import type { ValueProps, AccountDataType } from '../../types/Types';

export const Money = ({ onValueChange }: ValueProps): JSX.Element => {
    const queryClient = useQueryClient();
    const freshAccountData = queryClient.getQueryData<AccountDataType>("fetchAccountData");
    const [money, setMoney] = useState<number>(0);

    if (!freshAccountData) return (<span> 데이터를 불러올 수 없습니다.</span>)
    const isValid = money <= freshAccountData.balance

    const handleMoneyChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const rawMoney = event.target.value.replace(/[^0-9]/g, "");
        setMoney(Number(rawMoney));
        onValueChange({ value: rawMoney, valid: freshAccountData.balance >= Number(rawMoney) });
    }, [money])




    const handleMoneyAdd = (num: number) => {
        const amount = money + num
        setMoney(amount);
        onValueChange({ value: String(amount), valid: freshAccountData.balance >= money })
    };

    const handleMaxAmount = () => {
        setMoney(freshAccountData.balance);
        onValueChange({ value: String(freshAccountData.balance), valid: freshAccountData.balance >= money })
    };

    return (
        <>
            <div>
                <label className="label">
                    <span className="label-text">입금 금액</span>

                    <span className={`label-text text-primary font-bold ${!isValid ? 'animate-bounce text-red-500' : ''}`}>
                        잔액: {NumberFormat(freshAccountData.balance)}
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
