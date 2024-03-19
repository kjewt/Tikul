// import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Summary } from '../components/summary/Summary';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';
import { Api_Update } from '../api/InfoUtils';
import type { AccountDataType } from '../types/Types';

// const userUid = localStorage.getItem('uid')
// const fetchAccountData = async () => {
//     const data = await Api_Update();
//     return data || []; // 만약 data가 undefined이면 빈 배열을 반환
// };

export const Home = (): JSX.Element => {
    const [, setAccountData] = useRecoilState(accountDataState);
    const currentUser = JSON.parse(localStorage.getItem("account") || '{}') as AccountDataType;

    const isRegister = currentUser.IsRegister
    useEffect(() => {
        const fetchData = async () => {
            setAccountData(currentUser);
        };
        // Api_Update()
        fetchData();
    }, []);


    return (
        <div className="container min-h-screen">
            <div className={`grid ${isRegister ? "grid-cols-2" : null} gap-8`}>
                {isRegister ? (
                    <>
                        <Summary />
                        <Outlet />
                    </>
                ) : (
                    <>
                        <div className="py-32">
                            계좌를 먼저
                            <Link to="/setting" className="text-primary underline">
                                등록해주세요.
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

