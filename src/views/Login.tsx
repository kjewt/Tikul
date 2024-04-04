import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Password } from '../components/auth/Password';
import { BtnLogin } from '../components/auth/BtnLogin';
// import { BtnGoogleLogin } from '../components/auth/BtnGoogleLogin';
import { Email } from '../components/auth/Email';
import type { ChildrenValue } from '../types/Types';

const Login = (): JSX.Element => {

  const [email, setEmail] = useState<ChildrenValue>({ value: "", valid: false })
  const [password, setPassword] = useState<ChildrenValue>({ value: "", valid: false })

  const handleEmailChange = (newEmail: ChildrenValue) => {
    setEmail(newEmail)
  };

  const handlePasswordChange = (newPassword: ChildrenValue) => {
    setPassword(newPassword);
  };

  return (
    <>
      <div className="container min-h-screen">
        <div className="flex flex-col items-center">
          <div className="text-center mt-24">
            <Link to="/">
              <h1 className="text-5xl font-bold">Tikul</h1>
            </Link>
            <p className="py-3 mt-8">로그인</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body p">
              <form>
                <Email onValueChange={handleEmailChange} />
                <Password onValueChange={handlePasswordChange} />
              </form>
              <BtnLogin email={email.value} password={password.value} />
              {/* <div className="flex items-center justify-around">
                <hr className="w-1/3"></hr>
                <span>or</span>
                <hr className="w-1/3"></hr>
              </div> */}
              {/* <BtnGoogleLogin /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;