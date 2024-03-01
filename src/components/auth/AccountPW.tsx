import { useState, useRef, useEffect } from 'react';
import { AccountPwValid } from '../../business/valid/AccountPwValid';
import { KeyPad } from '../common/KeyPad';
import { ChildrenValue } from '../../types/Types';

type PropsType = {
    onAccountPWChange: (childValue: ChildrenValue) => void;
    width?: string;
};

export const AccountPW = ({ onAccountPWChange, width }: PropsType): JSX.Element => {
    const [isKeyPadOpen, setIsKeyPadOpen] = useState(false);
    const [accountPassword, setAccountPassword] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const MAX_ACCOUNTPW_LENGTH = 6;

    useEffect(() => {
        // 입력이 6자리가 되면 KeyPad 닫기
        if (accountPassword.length === MAX_ACCOUNTPW_LENGTH) {
            setIsKeyPadOpen(false);
        }
    }, [accountPassword]);

    const handlePrePasswordChange = (num: string) => {
        if (MAX_ACCOUNTPW_LENGTH < num.length) return;

        setAccountPassword(num);
        onAccountPWChange({ value: num, valid: AccountPwValid(num) });

        // 입력이 6자리가 되면 KeyPad 닫기
        if (num.length === MAX_ACCOUNTPW_LENGTH) {
            setIsKeyPadOpen(false);
        }
    };

    const handleInputClick = () => {
        setIsKeyPadOpen(true);
        // 6자리가 입력된 상태에서 다시 input 클릭하면 KeyPad 열기
        if (accountPassword.length === MAX_ACCOUNTPW_LENGTH) {
            setAccountPassword("");
        }
    };

    return (
        <>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">계좌 비밀번호</span>
                </label>
                <input
                    ref={inputRef}
                    type="password"
                    placeholder="숫자 6자리로 입력해주세요."
                    className={`input input-bordered input-primary ${width}`}
                    value={accountPassword}
                    onClick={handleInputClick}
                    readOnly
                />
                {isKeyPadOpen && <KeyPad onPWChange={handlePrePasswordChange} />}
            </div>
        </>
    );
};
