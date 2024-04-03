import { useCallback, useState } from "react"
import { useQuery } from 'react-query';
import { Api_fetchSummaryData } from '../../api/SummaryUtils';
import { RxTriangleRight } from "react-icons/rx";
import { CategoryDataType } from '../../types/Types';

import { ListSummary } from './ListSummary';
import { PieChartSummary } from "./PieChartSummary";


const fetchSummaryData = async (): Promise<CategoryDataType[]> => {
    const userUid = localStorage.getItem('uid')
    if (!userUid) return []
    const data = await Api_fetchSummaryData(userUid);
    return data || [];
};
export const Summary = (): JSX.Element => {
    const [isList, setIsList] = useState<boolean>(true)
    const { data: summaryData, isLoading, error } = useQuery('summaryData', fetchSummaryData, {
        initialData: [],
    });

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>데이터를 가져올 수 없습니다. <b />잠시 후에 다시 시도해주세요.</p>;

    const handleSwitchPage = useCallback(() => {
        setIsList((prev) => !prev)
    }, [])


    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="py-3">이번 달 통계</p>
                    </div>

                    <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                        <div className="card-body text-md">
                            <div className="edit flex justify-end items-center">
                                <button className="link link-primary" onClick={handleSwitchPage}>{`${isList ? "차트" : "통계"}보기`}</button>
                                <RxTriangleRight className="text-primary text-2xl" />
                            </div>
                            {isList ?
                                <ListSummary summaryData={summaryData} /> :
                                <PieChartSummary summaryData={summaryData} />

                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}


