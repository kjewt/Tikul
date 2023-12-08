import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore'
import type { ChildrenValue } from '../../types/authTypes';

export const BtnJoin = ({ email, password, cbx }: { email: ChildrenValue, password: ChildrenValue, cbx: boolean }): JSX.Element => {
    const isValid = email.valid && password.valid && cbx
    const navigate = useNavigate();


    const SignUp = async () => {
        try {
            await createUserWithEmailAndPassword(firebaseAuth, email.value, password.value);


            // 사용자 정보 Firestore에 저장
            const user = firebaseAuth.currentUser;

            if (user) {
                const userData = {
                    IsRegister: false,
                    email: email.value,
                    account: null,
                    bank: null,
                    accountPW: null,
                    balance: 0,
                };
                await setDoc(doc(db, "users", user.uid), userData);
                console.log('회원가입 성공');
                navigate('/login');
            }
        } catch (error) {
            console.log('회원가입 실패', error);
        }
    };

    return (
        <>
            <div className="form-control my-6">
                <button
                    className="btn btn-primary"
                    disabled={!isValid}
                    onClick={SignUp}>
                    회원가입하기

                </button>
            </div>
        </>
    );
};

