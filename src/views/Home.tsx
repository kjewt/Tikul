import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { NavBar } from '../components/common/NavBar';
import { Summary } from '../components/summery/Summary';
import { useSetRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';
import { Api_Update } from '../api/InfoUtils';

import type { AccountDataType } from '../types/Types';

export const Home = (): JSX.Element => {
    const setAccountData = useSetRecoilState(accountDataState);
    const currentUser = JSON.parse(localStorage.getItem("account") || '{}') as AccountDataType;

    useEffect(() => {
        const fetchData = async () => {
            Api_Update();
            setAccountData(currentUser);
        };

        fetchData();
    }, []);

    return (
        <div className="container min-h-screen">
            <NavBar />
            <div className="grid grid-cols-2 gap-8">
                {currentUser.IsRegister ? (
                    <>
                        <Summary />
                        <Outlet />
                    </>
                ) : (
                    <>
                        <div className="py-32">
                            계좌를 먼저{' '}
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

