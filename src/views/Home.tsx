import { Outlet, Link } from 'react-router-dom';
import { NavBar } from '../components/common/NavBar';
import { Summary } from '../components/banking/Summary';

const Home = (): JSX.Element => {

    const currentUser = JSON.parse(localStorage.getItem("account") || '{}');



    return (
        <div className="container min-h-screen">
            <NavBar />
            <div className="grid grid-cols-2 gap-8">
                <Summary />
                {currentUser.IsRegister ? (
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
