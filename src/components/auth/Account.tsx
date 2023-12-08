import React, { useState } from 'react';
import { AccountValid } from '../../business/valid/AccountValid';
// import { useRecoilState } from 'recoil';
// import { accountState, isAccountState } from '../../state/atoms';


export const Account = (): JSX.Element => {
    const [account, setAccount] = useState("");
    const isValid = AccountValid(account)
    const isError = !isValid && (account !== "")

    const handleAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userAccount = event.target.value.replace(/\s/g, '').slice(0, 13);
        setAccount(userAccount)

    };


    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">계좌 등록</span>
                    {isError && (
                        <span className="password-error text-sm text-error">
                            9~13자리의 숫자로 작성해주세요.
                        </span>
                    )}
                </label>
                <input
                    type="text"
                    placeholder="숫자로 작성해주세요."
                    className={`input input-bordered input-primary ${isError ? 'input-error' : ''}`}
                    value={account}
                    onChange={handleAccountChange}
                />
            </div>
        </>
    );
};
