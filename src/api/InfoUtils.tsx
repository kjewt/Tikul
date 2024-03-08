import { doc, getDoc, getDocs, addDoc, query, orderBy, updateDoc, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useMutation } from "react-query";
import type { AccountHistoryItem, TransferDataType } from "../types/Types";


type RegisterParamsType = {
    account: string;
    pw: string;
    bank: string;
    name: string;
    navigate: any;
}

const storedUid = localStorage.getItem('uid');
const account = localStorage.getItem('account');
const accountData = account ? JSON.parse(account) : null;


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
                categories: ["식비", "생활", "쇼핑", "주거/통신", "교통", "의료", "기타"]
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
            return;
        }

        const listRef = collection(db, "users", storedUid, "transferList");

        const querySnapshot = await getDocs(listRef);

        if (querySnapshot.empty) {
            await addDoc(listRef, {
                timestamp: new Date(),
                detail: "",
                memo: "",
                transactionType: "",
                category: "",
                amount: 0
            } as AccountHistoryItem);

            return []

        } else {
            const querySnapshot = await getDocs(query(listRef, orderBy("timestamp", "desc")));

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(data);
                return data
            });
        }
    } catch (error) {

        alert("계좌 내역 불러오기에 실패했습니다. 다시 시도해주세요.");
        console.error(error);
        return []
    }
};

// 송금
export const Api_transferMutation = () => {
    return useMutation(
        async ({ transferInfoProps, navigate }: { transferInfoProps: TransferDataType, navigate: any }) => {
            try {
                // 입력된 은행 이름과 계좌번호로 유저 검색
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('bank', '==', transferInfoProps.bank), where('account', '==', transferInfoProps.account));
                const querySnapshot = await getDocs(q);

                // 입력한 은행 이름과 계좌번호와 일치하는 유저가 찾아지면
                if (!querySnapshot.empty) {

                    // 송금하는 현재 유저의 "details" 컬렉션에 송금 내역 추가
                    if (!storedUid) {
                        alert('로그인이 필요합니다.');
                        // 로그인 페이지로 이동하거나 로그인을 유도하는 메시지를 표시할 수 있습니다.
                        navigate("/login"); // 로그인 페이지로 이동
                        return;
                    }

                    if (accountData.accountPW !== transferInfoProps.accountPW) {
                        console.log('계좌 비밀번호가 일치하지 않습니다.');
                        return;
                    }
                    const currentUserDocRef = doc(db, 'users', storedUid);

                    // 문서 데이터 가져오기
                    const currentUserDocSnap = await getDoc(currentUserDocRef);
                    const currentUserData = currentUserDocSnap.data();

                    // 보내는 유저
                    if (currentUserData) {
                        const currentUserDetailsRef = collection(db, 'users', storedUid, 'transferList');
                        const addTransaction = {
                            amount: - Number(transferInfoProps.money),
                            category: transferInfoProps.category,
                            detail: `${accountData.name}`, // 보내는 사람 이름
                            memo: transferInfoProps.memo,
                            timestamp: new Date(),
                            transactionType: "송금"
                        } as AccountHistoryItem;

                        await addDoc(currentUserDetailsRef, addTransaction);

                        await updateDoc(currentUserDocRef, {
                            balance: currentUserData.balance - Number(transferInfoProps.money),
                        });

                        // const userDoc = querySnapshot.docs[0].ref;
                        const userDoc = querySnapshot.docs[0];
                        const userRef = doc(db, 'users', userDoc.id);

                        // 돈 받는 유저의 "transferList" 컬렉션에 송금 내역 추가
                        const detailsRef = collection(db, 'users', userDoc.id, 'transferList');
                        await addDoc(detailsRef, {
                            amount: Number(transferInfoProps.money),
                            category: transferInfoProps.category,
                            detail: `${accountData.name}`, // 보내는 사람 이름
                            memo: transferInfoProps.memo,
                            timestamp: new Date(),
                            transactionType: "입금"
                        } as AccountHistoryItem);

                        await updateDoc(userRef, {
                            balance: userDoc.data().balance + Number(transferInfoProps.money),
                        });

                        console.log('송금 성공! 유저에게 내역이 추가되었습니다.');
                    }

                } else {
                    console.log('입력한 은행 이름과 계좌번호와 일치하는 유저를 찾을 수 없습니다.');
                }
            } catch (error) {
                console.log('송금 실패:', error);
            }
        }
    );
};
