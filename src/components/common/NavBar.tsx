import { useCallback, useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../../business/Logout';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../../state/atoms';
import { initialAccountData } from '../../state/staticData';


export const NavBar = () => {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useRecoilState(accountDataState)
    const [, setIsOpen] = useState(false)


    const storedAccountData = localStorage.getItem('account');
    const storedUid = localStorage.getItem('uid');
    useEffect(() => {

        if (!storedUid && !storedAccountData) {
            navigate('/login');
        }

        // if (storedAccountData && storedUid) {
        //     const parsedAccountData = JSON.parse(storedAccountData);
        //     setAccountData(parsedAccountData);
        // } else {
        //     ('사용자 정보를 찾을 수 없습니다');
        // }
    }, []);

    const handleLogout = useCallback(() => {
        setAccountData(initialAccountData)
        Logout();
        navigate('/login');

    }, [])

    return (
        <div>

            <div className="navbar bg-base-100 shadow-md hover:bg-transparent">
                <div className="flex-1">
                    <Link to="/home/banking">
                        <button className="btn btn-ghost normal-case text-xl hover:bg-transparent">TIKUL</button>
                    </Link>
                </div>
                {storedUid && <div className="flex-none">
                    <div>
                        {accountData.name ? accountData.name : accountData.email}
                    </div>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <button tabIndex={0} className="btn btn-ghost hover:bg-transparent"><FaUserCircle className="text-2xl" /></button>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <ul>
                                <li><Link to="/setting" onClick={(prev) => setIsOpen(!prev)}>설정</Link></li>
                                <li><div onClick={handleLogout}>로그아웃</div></li>
                            </ul>                        </ul>
                    </div>

                </div>}
            </div>
        </div>
    );
};

