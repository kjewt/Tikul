import React, { useState } from 'react';
import type { NameProps } from '../../types/authTypes';


export const Name = ({ onNameChange }: NameProps): JSX.Element => {
    const [name, setName] = useState("");
    const valid = name.length >= 2
    const isError = !valid && name !== ""

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const userName = event.target.value.replace(/\s/g, '').slice(0, 13);
        setName(userName)
        onNameChange({ value: userName, valid: valid })
    };


    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">예금주</span>
                    {isError && (
                        <span className="password-error text-sm text-error">
                            이름은 두 글자 이상으로 입력해주세요.
                        </span>
                    )}
                </label>
                <input
                    type="text"
                    placeholder="두 글자 이상 입력하세요."
                    className={`input input-bordered input-primary ${isError ? 'input-error' : ''}`}
                    value={name}
                    onChange={handleNameChange}
                />
            </div>
        </>
    );
};
