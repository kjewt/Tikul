import React, { useState } from 'react';
import { isEmailValid } from '../../business/valid/EmailValid';
import type { EmailProps } from '../../types/authTypes';

export const Email = ({ onEmailChange }: EmailProps): JSX.Element => {
    const [email, setEmail] = useState<string>("")
    const isValid = isEmailValid(email)
    const isError = !(isValid || (email === ""))

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value
        setEmail(newEmail)
        onEmailChange({ value: newEmail, valid: isEmailValid(newEmail) })
    };

    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">이메일</span>
                    {isError && <span className="text-sm text-error">이메일 형식으로 작성해주세요.</span>}
                </label>
                <div className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="이메일"
                        className={`input input-bordered input-primary w-full ${isError ? "input-error" : ""}`}
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
            </div>
        </>
    );
};

