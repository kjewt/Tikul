import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from 'react-router-dom';
// import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
// import { emailState, passwordState, accountDataState } from '../../state/atoms';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { firebaseAuth, db } from '../../../firebase';

// import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

export const BtnGoogleLogin = (): JSX.Element => {
    //     const navigate = useNavigate();
    //     const [accountData, setAccountData] = useRecoilState(accountDataState)
    //     const provider = new GoogleAuthProvider();
    //     provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    async function Login() {
        //         try {
        //             const result = await signInWithPopup(firebaseAuth, provider);
        //             const user = result.user;
        //             console.log(user)

        //             if (user) {
        //                 const userData = {
        //                     email: user.email,
        //                 };
        //                 const userRef = doc(db, "users", user.uid);

        //                 // 사용자 정보를 Firestore에 저장
        //                 await setDoc(userRef, userData, { merge: true });

        //                 // 데이터를 가져와서 bankName이 있는지 확인
        //                 const accountDoc = await getDoc(userRef);
        //                 const data = accountDoc.data();
        //                 // setAccountData(data);

        //                 if (!data?.bankName) {
        //                     // bankName이 없는 경우, 추가 정보 입력 페이지로 이동
        //                     navigate('/add');
        //                 } else {
        //                     // bankName이 있는 경우, Home 페이지로 이동
        //                     navigate('/Home');
        //                 }

        //                 console.log('로그인 성공!');
        //                 console.log('사용자 이메일:', user.email);
        //                 console.log('사용자 이름:', user.displayName);

        //                 // 구글 로그인의 결과로 받아온 사용자 정보를 세션 스토리지에 저장
        //                 localStorage.setItem('account', JSON.stringify(accountData));
        //                 localStorage.setItem('uid', JSON.stringify(user.uid));

        //             } else {
        //                 alert('로그인에 실패했습니다.'); // 로그인이 실패한 경우 처리
        //             }
        //         } catch (error) {
        //             alert('로그인에 실패했습니다.');
        //             console.error('로그인 오류:', error);;
        //         }
    }



    return (
        <>
            <div className="form-control mt-2">
                <button className="btn btn-outline btn-primary" onClick={Login}>
                    <div className="flex items-center gap-2">
                        <FcGoogle className="text-xl" />
                        <span>구글 아이디로 로그인</span>
                    </div>
                </button>
            </div>
        </>
    );
};

