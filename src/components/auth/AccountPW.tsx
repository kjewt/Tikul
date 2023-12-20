import React, { useState } from 'react';
import { AccountPwValid } from '../../business/valid/AccountPwValid';
import { ChildrenValue } from '../../types/authTypes';

type PropsType = {
    onAccountPWChange: (childValue: ChildrenValue) => void;
    width: string;
};




export const AccountPW = ({ onAccountPWChange, width }: PropsType): JSX.Element => {
    const [accountPassword, setAccountPassword] = useState<string>("")

    const handlePrePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pw = event.target.value.replace(/\D/g, '').slice(0, 6);
        setAccountPassword(pw)
        onAccountPWChange({ value: pw, valid: AccountPwValid(accountPassword) })

    };


    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">계좌 비밀번호</span>
                </label>
                <input
                    type="password"
                    placeholder="숫자 6자리로 입력해주세요."
                    className={`input input-bordered input-primary ${width}`}
                    value={accountPassword}
                    onChange={handlePrePasswordChange}
                />
            </div>



        </>
    );
};

