import { Routes, Navigate, Route } from 'react-router-dom';
import Login from '../views/Login';
import Join from '../views/Join';
import { Home } from '../views/Home'
import Setting from '../views/Setting'
import TransactionDetail from '../views/TransactionDetail';
import NotAUser from '../views/NotAUser';
import { Banking } from '../components/banking/Banking';
import { Transfer } from '../components/banking/Transfer';
import { AddMoney } from '../components/banking/AddMoney';

export const RouteList = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />

            <Route path="/home" element={<Home />} >
                <Route path="banking" element={<Banking />} />
                <Route path="transfer" element={<Transfer />} />
                <Route path="addMoney" element={<AddMoney />} />
            </Route>
            <Route path="/setting" element={<Setting />} />
            <Route path="/detail" element={<TransactionDetail />} />
            <Route path="/not-a-user" element={<NotAUser />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}