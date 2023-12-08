import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../../business/Logout';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../../state/atoms';
import { initialAccountData } from '../../state/staticData';


export const NavBar = () => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useRecoilState(accountDataState)

    useEffect(() => {
        const storedAccountData = localStorage.getItem('account');
        const storedUid = localStorage.getItem('uid');

        if (!storedAccountData) {
            navigate('/login');
        }

        if (storedAccountData && storedUid) {
            const parsedAccountData = JSON.parse(storedAccountData);
            setAccountData(parsedAccountData);
        } else {
            ('사용자 정보를 찾을 수 없습니다');
        }
    }, []);

    const handleLogout = () => {
        setAccountData(initialAccountData)
        Logout();
        navigate('/login');
        console.log(accountData)

    };

    return (
        <div>

            <div className="navbar bg-base-100 shadow-md">
                <div className="flex-1">
                    <Link to="/home">
                        <button className="btn btn-ghost normal-case text-xl">TIKUL</button>
                    </Link>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Link</a></li>
                        <li>
                            <details>
                                <summary>
                                    {accountData && (accountData.name ? accountData.name : accountData.email)}
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none w-32">
                                    <li><Link to="/setting">설정</Link></li>
                                    <li><div onClick={handleLogout}>로그아웃</div></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

