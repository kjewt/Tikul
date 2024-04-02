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


// uid가 저장된 상태라면 user의 데이터를 리턴하는 함수
export const Api_Update = async (storedUid: string) => {

    if (storedUid) {
        const userRef = doc(db, "users", storedUid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            localStorage.setItem('account', JSON.stringify(docSnap.data()));
            return docSnap.data();
        }
    }
    return {};
}

export const Api_Register = async ({ account, pw, bank, name, navigate }: RegisterParamsType) => {
    try {
        const storedUid = localStorage.getItem('uid');
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
            Api_Update(storedUid)
            alert("등록을 성공했습니다.");
            navigate('/home/banking');
        }
    } catch (error) {
        alert("등록을 실패했습니다. 다시 시도해주세요.");
        console.log(error);
    }
};

export const Api_fetchAccountHistory = async (uid: string) => {
    try {
        if (!uid) {
            return alert("거래내역을 가져오기 위해 로그인이 필요합니다.");
        }

        const listRef = collection(db, "users", uid, "transferList");

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




