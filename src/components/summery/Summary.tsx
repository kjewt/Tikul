import { useQuery } from 'react-query';
import { Api_fetchSummaryData } from '../../api/SummaryUtils';
import { CategoryDataType } from '../../types/Types';
import { CategoriesList } from './CategoriesList';
import { NumberFormat } from '../../business/NumberFormat';
import { BtnEditCategory } from './BtnEditCategory';



const fetchSummaryData = async (): Promise<CategoryDataType[]> => {
    const data = await Api_fetchSummaryData();
    return data || []; // 만약 data가 undefined이면 빈 배열을 반환
};
export const Summary = (): JSX.Element => {
    const { data: summaryData } = useQuery('summaryData', fetchSummaryData);

    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="py-3">이번 달 통계</p>
                    </div>

                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <div className="card-body text-md">
                            <div className="edit flex gap-2 justify-end">
                                <button className="link link-primary pb-2">자세히보기</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>수정</th>
                                            <th>카테고리</th>
                                            <th></th>
                                            <th>이번달 소비</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summaryData?.map((item, index) =>
                                        (<tr key={String(index) + item.category}>
                                            <td><BtnEditCategory category={item.category} /></td>
                                            <td className="min-w-16">{item.category}</td>
                                            <td><CategoriesList thisMonth={item.thisMonth} lastMonth={item.lastMonth} /></td>
                                            <td>{NumberFormat(item.thisMonth)}원</td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}


