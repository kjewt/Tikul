import { doc, getDoc, getDocs, addDoc, query, updateDoc, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useMutation } from "react-query";
import { AccountHistoryItem, TransferDataType } from "../types/Types";

const storedUid = localStorage.getItem('uid');

// 송금
export const Api_transferMutation = () => {
    return useMutation(
        async ({ transferInfoProps, navigate }: { transferInfoProps: TransferDataType, navigate: any }) => {
            try {
                // 입력된 은행 이름과 계좌번호로 유저 검색
                const usersRef = collection(db, 'users');
                const q = query(usersRef, where('bank', '==', transferInfoProps.bank), where('account', '==', transferInfoProps.account));
                const querySnapshot = await getDocs(q);

                // 입력한 은행 이름과 계좌번호와 일치하는 유저가 있는지 확인
                if (!querySnapshot.empty) {
                    if (!storedUid) {
                        alert('계좌 정보를 확인해주세요.');
                        return;
                    }

                    // 보내는 사람의 이름 가져오기
                    const currentUserDocRef = doc(db, 'users', storedUid);
                    const currentUserDocSnap = await getDoc(currentUserDocRef);
                    const accountData = currentUserDocSnap.data();

                    // 보내는 사람의 이름이 없으면 알림 출력 후 종료
                    if (!accountData || !accountData.name) {
                        alert('보내는 사람의 이름을 찾을 수 없습니다.');
                        return;
                    }

                    if (accountData.accountPW !== transferInfoProps.accountPW) {
                        alert('계좌 비밀번호가 일치하지 않습니다.');
                        return;
                    }

                    const currentUserDetailsRef = collection(db, 'users', storedUid, 'transferList');
                    // 입력된 category와 일치하는 summary 문서를 찾기 위한 쿼리
                    const summaryQuery = query(collection(db, 'users', storedUid, 'summary'), where('category', '==', transferInfoProps.category));

                    // 해당 쿼리 실행
                    const summarySnapshot = await getDocs(summaryQuery);

                    // 쿼리 결과가 비어있지 않은 경우에만 업데이트 실행
                    if (!summarySnapshot.empty) {
                        // summary 컬렉션 내에서 category가 일치하는 문서의 참조 가져오기
                        const summaryDocRef = summarySnapshot.docs[0].ref;
                        const summaryData = summarySnapshot.docs[0].data()

                        // 해당 문서의 thisMonth 필드 업데이트
                        await updateDoc(summaryDocRef, {
                            thisMonth: summaryData.thisMonth + Number(transferInfoProps.money)
                        });
                    }

                    // 받는 사람의 이름 가져오기
                    const receiverDoc = querySnapshot.docs[0]; // 첫 번째로 검색된 문서 사용
                    const receiverName = receiverDoc.data().name;

                    //보내는 유저에게 추가될 내역
                    const addTransaction = {
                        amount: -Number(transferInfoProps.money),
                        category: transferInfoProps.category,
                        detail: receiverName, // 받는 사람 이름
                        memo: transferInfoProps.memo,
                        timestamp: new Date(),
                        transactionType: "송금"
                    } as AccountHistoryItem;

                    // 보내는 유저의 "transferList" 컬렉션에 송금 내역 추가
                    await addDoc(currentUserDetailsRef, addTransaction);

                    // 보내는 유저의 잔액 업데이트
                    await updateDoc(currentUserDocRef, {
                        balance: accountData.balance - Number(transferInfoProps.money),
                    });


                    // 돈 받는 유저의 "transferList" 컬렉션에 입금 내역 추가
                    const receiverDetailsRef = collection(db, 'users', receiverDoc.id, 'transferList');
                    await addDoc(receiverDetailsRef, {
                        amount: Number(transferInfoProps.money),
                        category: "입금",
                        detail: accountData.name, // 받는 사람 이름
                        memo: transferInfoProps.memo,
                        timestamp: new Date(),
                        transactionType: "입금"
                    } as AccountHistoryItem);

                    // 받는 유저의 잔액 업데이트
                    const receiverRef = doc(db, 'users', receiverDoc.id);
                    await updateDoc(receiverRef, {
                        balance: receiverDoc.data().balance + Number(transferInfoProps.money),
                    });
                    // 받는 유저 입금 카테고리에 추가
                    const receiverSummaryRef = collection(db, 'users', receiverDoc.id, 'summary');
                    const summaryQuerySnapshot = await getDocs(receiverSummaryRef);

                    summaryQuerySnapshot.forEach(async (doc) => {
                        const categoryData = doc.data();
                        if (categoryData.category === '입금') {
                            await updateDoc(doc.ref, {
                                thisMonth: categoryData.thisMonth + Number(transferInfoProps.money)
                            });
                        }
                    });


                    // 송금 완료 알림 및 페이지 이동
                    console.log('송금을 완료했습니다.');
                    alert('송금을 완료했습니다.');
                    navigate('/home/banking');
                } else {
                    console.log('입력한 은행 이름과 계좌번호와 일치하는 유저를 찾을 수 없습니다.');
                }
            } catch (error) {
                console.log('송금 실패:', error);
            }
        }
    );
};

