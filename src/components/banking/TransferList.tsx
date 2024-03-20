// import Filtering from '../common/Filtering';
// import Pagination from "react-js-pagination";
// import '../../assets/css/paging.css'
import { useQuery } from 'react-query';
import { Api_fetchAccountHistory } from "../../api/InfoUtils"
import { NumberFormat } from '../../business/NumberFormat';
// import { TimeFormatter } from '../../business/TimeFormatter';
import type { AccountHistoryItem } from '../../types/Types';


const fetchAccountHistory = async (): Promise<AccountHistoryItem[]> => {
    const userUid = localStorage.getItem('uid')
    if (!userUid) return []
    const data = await Api_fetchAccountHistory(userUid);
    return data || [];
};

export const TransferList = (): JSX.Element => {
    const { data: transferData, isLoading, isError } = useQuery('accountHistory', fetchAccountHistory, {
        initialData: []
    });


    if (!transferData) {

        return <div className="bg-base-100 rounded-xl p-3 mb-3 mx-3">거래내역 불러오기 실패했습니다.</div>
    }
    if (transferData.length === 0) {

        return <div className="bg-base-100 rounded-xl py-20 mb-3 mx-3">거래내역이 없습니다.</div>
    }

    if (isLoading) {
        return <div className="bg-base-100 rounded-xl py-20 mb-3 mx-3">Loading...</div>;
    }

    if (isError) {
        return <div className="bg-base-100 rounded-xl py-20 mb-3 mx-3">데이터를 불러오는데 에러가 발생했습니다. <b />잠시 후 다시 시도해주세요.</div>;
    }

    return (
        <div className="flex flex-col gap-3 mb-3 mx-3 rounded-xl bg-base-100 p-3">
            <div className="h-8 rounded-xl bg-primary">필터링 영역</div>
            <div className="flex flex-col bg-base-100 rounded-xl text-base-100">
                <div className="overflow-x-auto">
                    <table className="table  text-black">
                        <tbody>
                            {transferData.map((item: AccountHistoryItem, index) => (
                                <tr key={String(index) + item.timestamp} className="flex gap-1 justify-between">
                                    <td className="flex flex-col min-w-[73px]">

                                        <span className="pt-3" >{item.detail}</span>
                                        <span className="text-sm opacity-50">{"시간"}</span>
                                    </td>
                                    <td className="flex flex-col gap-1 w-1/2">
                                        <span className="badge badge-ghost badge-sm p-2">{item.category}</span>
                                        <span className="text-sm opacity-50 p-2">{item.memo}</span>
                                    </td>
                                    <td className="text-xl flex items-center">{NumberFormat(item.amount)}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    );
};

