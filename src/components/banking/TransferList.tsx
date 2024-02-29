// import React, { useEffect, useState } from 'react';
// import { doc, getDoc, addDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
// import { firebaseAuth, db } from '../../../firebase';
// import { useRecoilState } from 'recoil';
// import { selectedDateState, filteredTransactionsState } from '../../state/atoms';
// import Filtering from '../common/Filtering';
// import Pagination from "react-js-pagination";
// import '../../assets/css/paging.css'
import { useQuery } from 'react-query';
import { Api_fetchAccountHistory } from "../../api/InfoUtils"
import type { AccountHistoryItem } from '../../types/Types';


const fetchAccountHistory = async (): Promise<AccountHistoryItem[]> => {
    const data = await Api_fetchAccountHistory();
    console.log(data);
    return data || []; // 만약 data가 undefined이면 빈 배열을 반환
};




export const TransferList = (): JSX.Element => {
    const { data: transferData, isLoading, isError } = useQuery('accountHistory', fetchAccountHistory);

    if (!transferData) {
        console.log(transferData)
        return <div className="bg-base-100 rounded-xl p-3 mb-3 mx-3">거래내역이 없습니다.</div>
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>데이터를 불러오는데 에러가 발생했습니다. <b />잠시 후 다시 시도해주세요.</div>;
    }

    return (
        <div className="flex flex-col gap-3 mb-3 mx-3 rounded-xl bg-base-100 p-3">
            <div className="h-8 rounded-xl bg-primary">필터링 영역</div>
            <div className="flex flex-col bg-primary rounded-xl text-base-100">
                거래 리스트 영역
                <div className="bg-base-100 border-b text-sm">
                    <div className="flex justify-between text-info p-4">
                        <div className="flex justify-between gap-2">
                            <span className="flex items-center">날짜</span>
                            <span className="">입금자</span>
                            <span className="">카테고리</span>
                        </div>
                        <div className="">
                            <span className="">금액</span>
                        </div>
                    </div>
                    {transferData.map((item: AccountHistoryItem) => (
                        <div key={String(item.timestamp)}>
                            <span>{item.detail}</span>
                            <span>{item.amount}</span>
                            <span>{item.category}</span>
                            <span>{item.timestamp.toTimeString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


    //    
    //     const [description, setDescription] = useState<string>('');
    //     const [amount, setAmount] = useState<number>(0);
    //     const [showAddContent, setShowAddContent] = useState<boolean>(false);
    //     const [isWithdrawal, setIsWithdrawal] = useState<boolean>(false);

    //     // 필터필터필터
    //     const [filteredTransactions, setFilteredTransactions] = useRecoilState(filteredTransactionsState)
    //     const [count, setCount] = useState(0); // 아이템 총 개수
    //     const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 1로 설정
    //     const [postPerPage] = useState(5); // 한 페이지에 보여질 아이템 수

    //     const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    //     const [indexOfFirstPost, setIndexOfFirstPost] = useState(1);
    //     interface Transaction {
    //         date: Date;
    //         description: string;
    //         amount: number;
    //         category: string;
    //         isWithdrawal: number;
    //     }
    //     const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>([]);


    //     const toggleWithdrawal = () => {
    //         setIsWithdrawal((prev) => !prev);
    //     };

    //     const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         setDescription(e.target.value);
    //     };

    //     const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //         setAmount(Number(e.target.value));
    //     };

    //     useEffect(() => {
    //         setCount(filteredTransactions.length);
    //         setIndexOfLastPost(currentPage * postPerPage);
    //         setIndexOfFirstPost(indexOfLastPost - postPerPage);
    //         setCurrentTransactions(filteredTransactions.slice(indexOfFirstPost, indexOfLastPost));
    //     }, [currentPage, indexOfFirstPost, indexOfLastPost, filteredTransactions, postPerPage]);


    //     const handlePageChange = (pageNumber: number) => {
    //         setCurrentPage(pageNumber);
    //     };





        //        <>
        //                <div className="card-body mx-3 my-3 px-4 py-2 pb-4 rounded-xl bg-base-100">
        //                    <div className="flex justify-end gap-2 text-sm">
        //                        {/* <button><i className='bx bxs-edit-alt text-2xl text-primary'></i></button> */}

        //                         <div className="lg:tooltip tooltip-primary text-sm" data-tip="추가하기">
        //                             {/* <button onClick={() => setShowAddContent((prev) => !prev)}>
        //                                 <i className='bx bx-list-plus text-3xl text-primary'></i>
        //                             </button> */}
        //                         </div>
        //                     </div>
        //                     <Filtering />
        //                     <hr></hr>
        //                     {Array.isArray(currentTransactions) && currentTransactions.length > 0 ? (
        //                         currentTransactions.map((transaction, index: number) =>
        //                             <div key={index}>
        //                                 <div className="transaction flex justify-between text-info">
        //                                     <div className="transaction-info text-sm flex gap-2">
        //                                         <span className="text-[12px] flex items-center">날짜 비지니스로직에서 가져오기</span>

        //                                     <span className="">{transaction.description}</span>
        //                                     <span className={`badge badge-primary px-1 text-sm text-base-100
        //                                     ${transaction.isWithdrawal === 0 ? 'badge-secondary' : transaction.isWithdrawal === 1 ? 'badge-primary' : 'badge-success'}`}>
        //                                         {transaction.isWithdrawal === 0 ? '송금' : transaction.isWithdrawal === 1 ? '입금' : '충전'}
        //                                     </span>
        //                                 </div>
        //                                 <div>
        //                                     {detail ? (<span className="px-4 text-sm"> {transaction.category} |</span>) : ''}
        //                                     <span className="text-sm">{Boolean(transaction.isWithdrawal) ? '+' : '-'}</span>
        //                                     <span className="text-sm">{transaction.amount.toLocaleString()}원</span>
        //                                 </div>

        //                                 </div>
        //                                 <hr className="m-1" />
        //                             </div>
        //                         ))
        //                     ) : (
        //                         <div className="text-sm text-center text-primary">거래내역이 없습니다.</div>
        //                     )
        //                     }


        //                  </div >
        //                  <div>
        //                      {/* <Pagination
        //                          activePage={currentPage}
        //                          itemsCountPerPage={5}
        //                          totalItemsCount={count}
        //                          pageRangeDisplayed={5}
        //                          prevPageText={"<"}
        //                          nextPageText={">"}
        //                          onChange={handlePageChange}

        //                      /> */}
        //                  </div>
        // </>

