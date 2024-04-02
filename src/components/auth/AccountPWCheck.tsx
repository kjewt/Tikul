import React, { useState } from 'react';
import { AccountPwValid } from '../../business/valid/AccountPwValid';
import { PwDoubleCheckValid } from '../../business/valid/PwDoubleCheckValid';
import { ValueProps } from '../../types/Types';



export const AccountPWCheck = ({ onValueChange }: ValueProps): JSX.Element => {
    const [accountPassword, setAccountPassword] = useState<string>("")
    const [comparingPassword, setComparingPassword] = useState<string>("")

    const isValid = AccountPwValid(accountPassword)
    const isSame = PwDoubleCheckValid(accountPassword, comparingPassword)

    const handlePrePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pw = event.target.value.replace(/\D/g, '').slice(0, 6);
        setAccountPassword(pw)


    };

    const handleAccountPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const pw = event.target.value.replace(/\D/g, '').slice(0, 6);
        setComparingPassword(pw)
        onValueChange({ value: pw, valid: PwDoubleCheckValid(accountPassword, pw) })
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
                    className="input input-bordered input-primary"
                    value={accountPassword}
                    onChange={handlePrePasswordChange}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">계좌 비밀번호 확인</span>
                    {isSame || comparingPassword !== "" && (
                        <span className="text-sm text-error">비밀번호가 일치하지 않습니다.</span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder="계좌 비밀번호 확인"
                    className={`password input input-bordered input-primary ${!isSame && 'input-error'}`}
                    value={comparingPassword}
                    onChange={handleAccountPasswordChange}
                    disabled={!isValid}
                />
            </div>


        </>
    );
};

