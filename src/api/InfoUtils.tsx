import { doc, getDoc, getDocs, addDoc, query, orderBy, updateDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { AccountHistoryItem } from "../types/Types";


type RegisterParamsType = {
    account: string;
    pw: string;
    bank: string;
    name: string;
    navigate: any;
}

const storedUid = localStorage.getItem('uid');
// const account = localStorage.getItem('account');
// const accountData = account ? JSON.parse(account) : null;

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
            navigate('/home/banking');
        }
    } catch (error) {
        alert("등록을 실패했습니다. 다시 시도해주세요.");
        console.log(error);
    }
};

export const Api_fetchAccountHistory = async () => {
    try {
        if (!storedUid) {
            return alert("로그인이 필요합니다.");
        }

        const listRef = collection(db, "users", storedUid, "transferList");

        const listQuerySnapshot = await getDocs(listRef);

        if (listQuerySnapshot.empty) {
            await addDoc(listRef, {});



            return [];

        } else {
            let listData = [] as Array<AccountHistoryItem>;
            const listQuerySnapshot = await getDocs(query(listRef, orderBy("timestamp", "desc")));

            listQuerySnapshot.forEach((doc) => {
                const item = doc.data();
                listData.push(item as AccountHistoryItem);
            });

            return listData;
        }
    } catch (error) {
        alert("계좌 내역 불러오기에 실패했습니다. 다시 시도해주세요.");
        console.error(error);
        return [];
    }
};




