import React, { useCallback, useState } from 'react';
import { PwValid } from '../../business/valid/PwValid';
import { PasswordProps } from '../../types/Types';

export const Password = ({ onPasswordChange }: PasswordProps): JSX.Element => {
    const [password, setPassword] = useState<string>("")

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value
        setPassword(newPassword);
        onPasswordChange({ value: newPassword, valid: PwValid(newPassword) })
    }, [password])


    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">비밀번호</span>

                </label>
                <input
                    type="password"
                    placeholder="비밀번호 입력"
                    className={`password input input-bordered input-primary `}
                    value={password}
                    onChange={handlePasswordChange}
                />

            </div>

        </>
    );
};

