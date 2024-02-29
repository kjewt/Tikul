import React, { useState } from 'react';
import { PwValid } from '../../business/valid/PwValid'
import { PwDoubleCheckValid } from '../../business/valid/PwDoubleCheckValid'
import { PasswordProps } from '../../types/Types';

export const PasswordCheck = ({ onPasswordChange }: PasswordProps): JSX.Element => {
    const [password, setPassword] = useState<string>("")
    const [comparingPassword, setComparingPassword] = useState<string>("")

    const isValid = PwValid(password)
    const isSame = PwDoubleCheckValid(password, comparingPassword)
    const isError = !(isValid || (password === ""))

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        setPassword(event.target.value);
    };
    const handlePasswordDoubleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value
        setComparingPassword(newPassword);
        onPasswordChange({ value: newPassword, valid: PwDoubleCheckValid(password, newPassword) })
    };

    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">비밀번호</span>
                    {(isError) && (
                        <span className="text-sm text-error">대문자, 소문자, 숫자 포함 8~16자 이내</span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    className={`password input input-bordered input-primary ${isError ? 'input-error' : ""}`}
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">비밀번호 재확인</span>
                    {isSame || comparingPassword !== "" && (
                        <span className="text-sm text-error">비밀번호가 일치하지 않습니다.</span>
                    )}
                </label>
                <input
                    type="password"
                    placeholder="비밀번호 재확인"
                    className={`password input input-bordered input-primary ${!isSame ? "input-error" : ""}`}
                    value={comparingPassword}
                    onChange={handlePasswordDoubleCheck}
                    disabled={!(isValid)}
                />
            </div>
        </>
    );
};

