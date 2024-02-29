import { Outlet, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';
import { NavBar } from '../components/common/NavBar';
import { Summary } from '../components/banking/Summary';

const Home = (): JSX.Element => {
    const [accountData] = useRecoilState(accountDataState);

    return (
        <div className="container min-h-screen">
            <NavBar />
            <div className="grid grid-cols-2">
                <Summary />
                {accountData.IsRegister ? (
                    <Outlet />) : (
                    <>
                        <div className="py-32"> 계좌를 먼저 <Link to="/setting" className="text-primary underline">등록해주세요.</Link></div>
                    </>
                )}


            </div>
        </div>
    );
};

export default Home;
