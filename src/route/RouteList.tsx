import { Routes, Navigate, Route } from 'react-router-dom';
import Login from '../views/Login';
import Join from '../views/Join';
import Home from '../views/Home'
import Setting from '../views/Setting'
// import Keypad from '../components/common/KeyPad';
import TransactionDetail from '../views/TransactionDetail';
import NotAUser from '../views/NotAUser';

export const RouteList = () => {

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/home" element={<Home />} />
            <Route path="/setting" element={<Setting />} />
            {/* <Route path="/keypad" element={<Keypad />} /> */}
            <Route path="/detail" element={<TransactionDetail />} />
            <Route path="/not-a-user" element={<NotAUser />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}