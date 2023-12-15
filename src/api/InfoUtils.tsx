import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
type RegisterParamsType = {
    account: string;
    pw: string;
    bank: string;
    name: string;
    navigate: any;
}

const storedUid = localStorage.getItem('uid');


//새로 accountData 데이터를 받아와서 로컬에 저장시키는 메서드.
export const Api_Update = () => {
    if (storedUid) {
        const userRef = doc(db, "users", storedUid);
        getDoc(userRef).then((doc: any) => {
            if (doc.exists) {
                localStorage.setItem('account', JSON.stringify(doc.data()));

            } else {
                console.log("Document data: 문서가 없습니다.");
            }
        });
    }
}

export const Api_Register = async ({ account, pw, bank, name, navigate }: RegisterParamsType) => {
    try {
        if (storedUid) {
            const userData = {
                IsRegister: true,
                account: account,
                accountPW: pw,
                bank: bank,
                name: name,
            };

            const userRef = doc(db, "users", storedUid);
            await updateDoc(userRef, userData);
            Api_Update()
            alert("등록을 성공했습니다.");
            navigate('/home');
        }
    } catch (error) {
        alert("등록을 실패했습니다. 다시 시도해주세요.");
        console.log(error);
    }
};


