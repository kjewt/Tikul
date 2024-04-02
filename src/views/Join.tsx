import { useState } from "react"
import { Link } from 'react-router-dom';
import { Email } from '../components/auth/Email';
import { PasswordCheck } from '../components/auth/PasswordCheck';
import { CheckboxGroup } from '../components/auth/CheckboxGroup';
import { BtnJoin } from '../components/auth/BtnJoin';
import type { ChildrenValue } from '../types/Types';


const Join = (): JSX.Element => {
    const [email, setEmail] = useState<ChildrenValue>({ value: "", valid: false })
    const [password, setPassword] = useState<ChildrenValue>({ value: "", valid: false })
    const [cbx, setCbx] = useState<boolean>(false);

    const handleEmailChange = (newEmail: ChildrenValue) => {
        setEmail(newEmail)
    };

    const handlePasswordChange = (newPassword: ChildrenValue) => {
        setPassword(newPassword);
    };

    const handleCbxChange = (newCbx: boolean) => {
        setCbx(newCbx);
    };


    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <Link to="/">
                            <h1 className="text-5xl font-bold">Tikul</h1>
                        </Link>
                        <p className="py-3 mt-8">회원가입</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <Email onValueChange={handleEmailChange} />
                            <PasswordCheck onValueChange={handlePasswordChange} />

                            <div className="flex items-center justify-around">
                                <hr className="w-full mt-6"></hr>
                            </div>
                            <CheckboxGroup onCbxChange={handleCbxChange} />
                            <BtnJoin email={email} password={password} cbx={cbx} />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Join;
