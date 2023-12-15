import { useNavigate, Link } from 'react-router-dom';
import { firebaseAuth, db } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../../state/atoms';

type PropsType = { email: string, password: string }

export const BtnLogin = ({ email, password }: PropsType): JSX.Element => {
    const navigate = useNavigate();
    const [, setAccountData] = useRecoilState(accountDataState)

    const Login = async () => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            const updatedUser = firebaseAuth.currentUser;

            if (updatedUser) {
                const userRef = doc(db, "users", updatedUser.uid);
                getDoc(userRef).then((doc: any) => {
                    if (doc.exists) {
                        setAccountData(doc.data());
                        localStorage.setItem('account', JSON.stringify(doc.data()));
                        localStorage.setItem('uid', updatedUser.uid);
                        console.log(doc.data());
                        navigate('/Home');
                    } else {
                        console.log("Document data: 문서가 없습니다.");
                    }
                }).catch((error: Error) => {
                    console.log("Error getting document:", error);
                });
            }
        } catch (error) {
            console.log('로그인 실패', error);
            const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement | null;

            if (modalElement) {
                modalElement.showModal();
            }
        }
    };


    return (
        <>
            <div className="form-control mt-6">
                <div>
                    <button className="btn btn-primary w-full" onClick={Login}>
                        Login
                    </button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-primary">로그인 실패</h3>
                            <p className="py-4">이메일이나 비밀번호가 일치하지 않습니다.</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">
                                        닫기
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
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
