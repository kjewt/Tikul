import { useQuery } from 'react-query';
import { Api_fetchSummaryData } from '../../api/InfoUtils';
import { CategoryDataType } from '../../types/Types';
import { CategoriesList } from './CategoriesList';
import { NumberFormat } from '../../business/NumberFormat';



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
                            <div className="category">
                                <div className="edit flex gap-2 justify-end">
                                    <button className="link link-primary pb-2">자세히보기</button>
                                </div>
                                {summaryData?.map((item, index) =>
                                (<div key={String(index) + item.category} className="category-content flex justify-between p-4 border-b last:border-0">
                                    <span className="min-w-16 w-1/3">{item.category}</span>
                                    <CategoriesList thisMonth={item.thisMonth} lastMonth={item.lastMonth} />
                                    <span>{NumberFormat(item.thisMonth)}원</span>
                                </div>))}

                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


