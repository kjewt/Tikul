import { useNavigate, Link } from 'react-router-dom';
import { firebaseAuth, db } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useMutation } from 'react-query';

type PropsType = { email: string, password: string }

export const BtnLogin = ({ email, password }: PropsType): JSX.Element => {
    const navigate = useNavigate();

    const loginMutation = useMutation(async () => {
        const userAuth = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const updatedUser = userAuth.user;

        if (updatedUser && updatedUser.uid) {
            const userRef = doc(db, "users", updatedUser.uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                localStorage.setItem('uid', updatedUser.uid);
                localStorage.setItem('account', JSON.stringify(docSnap.data()));
                navigate('/Home/banking');
            } else {
                console.log("Document data: 문서가 없습니다.");
            }
        }
    }, {
        onError: () => {
            alert("비밀번호나 이메일이 일치하지 않습니다.")
        }
    });

    const handleLogin = () => {
        loginMutation.mutate();
    };

    return (
        <>
            <div className="form-control mt-6">
                <div>
                    <button className="btn btn-primary w-full" onClick={handleLogin} aria-label="로그인">
                        {loginMutation.isLoading ? (<span className="loading loading-spinner"></span>) : 'Login'}
                    </button>
                </div>
                <label className="label justify-center mt-2">
                    <span className="text-sm mr-2">아직 회원이 아니라면 지금 바로</span>
                    <Link to="join" className="link-hover text-sm text-primary">
                        가입하세요
                    </Link>
                </label>
            </div>
        </>
    );
};
