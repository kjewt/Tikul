import { useQuery } from 'react-query';
import { Outlet, Link } from 'react-router-dom';
import { Summary } from '../components/summary/Summary';
import { Api_Update } from '../api/InfoUtils';
import type { AccountDataType } from '../types/Types';
import { initialAccountData } from '../state/staticData';

export const fetchAccountData = async (): Promise<AccountDataType> => {
    const userUid = localStorage.getItem("uid")
    if (userUid) {
        const data = await Api_Update(userUid);
        return data as AccountDataType
    }
    return initialAccountData
};

export const Home = (): JSX.Element => {
    const { data: freshAccountData, isLoading } = useQuery<AccountDataType>("fetchAccountData", fetchAccountData)

    const isRegister = freshAccountData?.IsRegister
    const uid = localStorage.getItem('uid')


    return (
        <div className="container min-h-screen">
            <div className={`grid ${isRegister ? "grid-cols-2" : null} gap-8`}>
                {!uid ? (
                    <>
                        <div className="py-32">
                            계좌를 먼저
                            <Link to="/setting" className="text-primary underline">
                                등록해주세요.
                            </Link>
                        </div>
                    </>
                ) : isLoading ?
                    (<div className="flex justify-center p-20">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <span>로딩 중입니다.</span>
                    </div>) :
                    (
                        <>
                            <Summary />
                            <Outlet />
                        </>
                    )}
            </div>
        </div>
    );
};

