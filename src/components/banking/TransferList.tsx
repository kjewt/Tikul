
import { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { Api_fetchAccountHistory } from "../../api/InfoUtils"
import { NumberFormat } from '../../business/NumberFormat';
import { TimeFormatter } from '../../business/TimeFormatter';
import type { AccountHistoryItem } from '../../types/Types';
import Pagination from "react-js-pagination";
import '../../assets/css/paging.css'


const fetchAccountHistory = async (): Promise<AccountHistoryItem[]> => {

    const userUid = localStorage.getItem('uid')
    if (!userUid) return []
    const data = await Api_fetchAccountHistory(userUid);
    return data || [];
};

export const TransferList = (): JSX.Element => {
    const { data: transferData, isLoading } = useQuery('accountHistory', fetchAccountHistory, {
        initialData: []
    });
    const [page, setPage] = useState<number>(1)
    const [currentPost, setCurrentPost] = useState<AccountHistoryItem[] | undefined>(transferData)
    const postPerPage = 5
    const indexOfLastPost = page * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    useEffect(() => {
        setCurrentPost(transferData?.slice(indexOfFirstPost, indexOfLastPost))
    }, [transferData, page])


    if (!transferData) {

        return <div className="bg-base-100 rounded-xl p-3 mb-3 mx-3">거래내역 불러오기 실패했습니다.</div>
    }
    if (transferData.length === 0) {

        return <div className="bg-base-100 rounded-xl py-20 mb-3 mx-3">거래내역이 없습니다.</div>
    }

    if (isLoading) {
        return <div className="bg-base-100 rounded-xl py-20 mb-3 mx-3">Loading...</div>;
    }


    return (
        <div className="flex flex-col gap-3 mb-3 mx-3 rounded-xl bg-base-100 p-3">
            <div className="flex flex-col bg-base-100 rounded-xl text-base-100">
                <div className="overflow-x-auto">
                    <table className="table  text-black">
                        <tbody>
                            {currentPost?.map((item: AccountHistoryItem, index) => (
                                <tr key={String(index) + item.timestamp} className="flex gap-1 justify-start">
                                    <td className="flex flex-col w-28">

                                        <span className="pt-3" >{item.detail}</span>
                                        <span className="text-sm opacity-50">{TimeFormatter(item.timestamp)}</span>
                                    </td>
                                    <td className="w-full flex justify-between">

                                        <td className="flex flex-col gap-1">
                                            <span className="badge badge-ghost badge-sm p-2">{item.category}</span>
                                            <span className="text-sm opacity-50 p-2">{item.memo}</span>
                                        </td>
                                        <td className="text-xl flex items-center">{NumberFormat(item.amount)}</td>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    <div>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={5}
                            totalItemsCount={transferData.length}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>


            </div>
        </div>
    );
};

