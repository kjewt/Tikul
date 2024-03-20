import { useQuery } from 'react-query';
import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Summary } from '../components/summary/Summary';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';
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
    const { data: freshAccountData } = useQuery<AccountDataType>("fetchAccountData", fetchAccountData)
    const [, setAccountData] = useRecoilState(accountDataState);

    const isRegister = freshAccountData?.IsRegister

    useEffect(() => {
        const fetchData = async () => {
            if (freshAccountData) {
                setAccountData(freshAccountData);
                console.log(freshAccountData)
                console.log("home 화면에서 실행되었습니다.")
            }
        };
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

