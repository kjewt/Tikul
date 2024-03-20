

import { getDocs, addDoc, getDoc, query, orderBy, updateDoc, collection, where, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { AccountDataType, CategoryDataType } from "../types/Types";
import { categoriesStaticData } from "../state/staticData";


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
        const storedUid = localStorage.getItem('uid')
        if (!storedUid) {
            return alert("카테고리 수정에 로그인이 필요합니다.");
        }

        const summaryQuery = query(collection(db, 'users', storedUid, 'summary'), where('category', '==', oldCategory));
        const summarySnapshot = await getDocs(summaryQuery);

        if (!summarySnapshot.empty) {

            const summaryDocRef = summarySnapshot.docs[0].ref;


            await updateDoc(summaryDocRef, {
                category: newCategory
            })

            const userRef = doc(db, "users", storedUid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = { ...userDoc.data() } as AccountDataType;

                if (userData.categories) {
                    const updatedCategories = userData.categories.map(category => {
                        if (category === oldCategory) {
                            return newCategory;
                        } else {
                            return category;
                        }
                    });

                    await updateDoc(userRef, {
                        categories: updatedCategories
                    });
                }
            } else {
                console.log("해당 사용자 문서가 존재하지 않습니다.");
            }



            alert("수정이 완료되었습니다.")
        }

    } catch (error) {
        alert("수정에 실패했습니다.");
        console.error(error);
    }
};
