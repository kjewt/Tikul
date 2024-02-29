import { Routes, Navigate, Route } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { accountDataState } from '../state/atoms';
import Login from '../views/Login';
import Join from '../views/Join';
import Home from '../views/Home'
import Setting from '../views/Setting'
// import Keypad from '../components/common/KeyPad';
import TransactionDetail from '../views/TransactionDetail';
import NotAUser from '../views/NotAUser';
import { Banking } from '../components/banking/Banking';
import { Transfer } from '../components/banking/Transfer';
import { AddMoney } from '../components/banking/AddMoney';

export const RouteList = () => {
    const [accountData] = useRecoilState(accountDataState);
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />

            <Route path="/home" element={<Home />} >
                <Route path="banking" element={<Banking name={accountData.name} balance={accountData.balance} account={accountData.account} bank={accountData.bank} />} />
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