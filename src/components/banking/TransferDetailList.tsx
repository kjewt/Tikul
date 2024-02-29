// import React, { useEffect, useState } from 'react';
// import { doc, getDoc, addDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
// import { firebaseAuth, db } from '../../../firebase';
// import { useRecoilState } from 'recoil';
// import { selectedDateState, filteredTransactionsState } from '../../state/atoms';
// import Filtering from '../common/Filtering';
// import Pagination from "react-js-pagination";
// import '../../assets/css/paging.css'

export const TransferDetailList = (): JSX.Element => {

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



    return (
        <>
            <div className="flex flex-col gap-3 mb-3 mx-3 rounded-xl bg-base-100 p-3">

                <div className="h-8 rounded-xl bg-primary">필터링 영역</div>
                <div className="flex flex-col bg-primary">
                    거래 리스트 영역
                    <div>
                        <div className="transaction flex justify-between text-info">
                            <div className="transaction-info text-sm flex gap-2">
                                <span className="text-[12px] flex items-center">날짜</span>

                                <span className="">상세 내용</span>
                                <span className={`badge badge-primary px-1 text-sm text-base-100`}>
                                    뱃지
                                </span>
                            </div>
                            <div>
                                <span className="px-4 text-sm">카테고리</span>
                                <span className="text-sm">출금,입금</span>
                                <span> 메모</span>
                                <span className="text-sm">거래량(돈)</span>
                            </div>

                        </div>
                        <hr className="m-1" />
                    </div>
                </div>
            </div>

        </>

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

    );

}
