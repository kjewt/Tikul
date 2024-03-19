

import { getDocs, addDoc, query, orderBy, updateDoc, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import { CategoryDataType } from "../types/Types";
import { categoriesStaticData } from "../state/staticData";

const storedUid = localStorage.getItem('uid');

// 요약 내역 생성 및 불러오기
export const Api_fetchSummaryData = async (uid: string) => {
    try {
        const summaryRef = collection(db, "users", uid, "summary");

        const summaryQuerySnapshot = await getDocs(summaryRef);
        if (summaryQuerySnapshot.empty) {
            await addDoc(summaryRef, {
                category: "입금",
                thisMonth: 0,
                lastMonth: 0,
            });

            for (const categoryData of categoriesStaticData) {
                await addDoc(summaryRef, JSON.parse(JSON.stringify(categoryData)));
            }

            console.log("등록완료")
            const summaryData = [{
                category: "입금",
                thisMonth: 0,
                lastMonth: 0,
            }, ...categoriesStaticData];
            return summaryData;

        } else {
            let summaryData = [] as Array<CategoryDataType>;
            const SummaryQuerySnapshot = await getDocs(query(summaryRef, orderBy("category")));

            SummaryQuerySnapshot.forEach((doc) => {
                const item = doc.data();
                summaryData.push(item as CategoryDataType);
            });
            console.log(summaryData)
            return summaryData;
        }
    } catch (error) {
        alert("요약 데이터를 불러오는데 실패했습니다. 다시 시도해주세요.");
        console.error(error);
        return [];
    }
};


// 요약 내역의 카테고리 이름 수정기능
export const Api_EditCategory = async (oldCategory: string, newCategory: string) => {
    try {
        if (!storedUid) {
            return alert("요약 정보를 불러오는데 로그인이 필요합니다.");
        }

        const summaryQuery = query(collection(db, 'users', storedUid, 'summary'), where('category', '==', oldCategory));
        const summarySnapshot = await getDocs(summaryQuery);

        if (!summarySnapshot.empty) {

            // summary 컬렉션 내에서 category가 일치하는 문서의 참조 가져오기
            const summaryDocRef = summarySnapshot.docs[0].ref;

            await updateDoc(summaryDocRef, {
                category: newCategory
            })

            alert("수정이 완료되었습니다.")
        }

    } catch (error) {
        alert("수정에 실패했습니다.");
        console.error(error);
    }
};
