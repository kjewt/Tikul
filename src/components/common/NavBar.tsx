import { useCallback, useEffect } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { Logout } from '../../business/Logout';
import { useQueryClient } from 'react-query';

export const NavBar = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const handleLogout = useCallback(() => {
        queryClient.removeQueries("fetchAccountData");
        Logout();
        navigate('/login');

    }, [])

    const storedAccountData = localStorage.getItem('account');
    const storedUid = localStorage.getItem('uid');

    useEffect(() => {

        if (!storedUid && !storedAccountData) {
            navigate('/login');
        }
    }, []);
    useEffect(() => {
        const clearLocalStorage = () => {
            localStorage.clear();
        };

        window.addEventListener('beforeunload', clearLocalStorage);

        return () => {
            window.removeEventListener('beforeunload', clearLocalStorage);
        };
    }, []);

    if (!storedAccountData) return null

    const userAccountData = JSON.parse(storedAccountData)



    return (
        <div>

            <div className="navbar bg-base-100 shadow-md hover:bg-transparent">
                <div className="flex-1">
                    <Link to={`${storedUid ? "/home/banking" : "/login"}`}>
                        <button className="btn btn-ghost normal-case text-xl hover:bg-transparent">TIKUL</button>
                    </Link>
                </div>
                {storedUid && <div className="flex-none">
                    <div>
                        {(userAccountData?.name) ? userAccountData.name : userAccountData?.email}
                    </div>
                    <div className="dropdown dropdown-bottom dropdown-end">
                        <button tabIndex={0} className="btn btn-ghost hover:bg-transparent"><FaUserCircle className="text-2xl" /></button>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <ul>
                                <li><Link to="/setting">설정</Link></li>
                                <li><div onClick={handleLogout}>로그아웃</div></li>
                            </ul>                        </ul>
                    </div>

                </div>}
            </div>
        </div>
    );
};

