import { useState, useCallback } from "react"
import { Account } from "../auth/Account"
import { AccountPW } from "../auth/AccountPW"
import { Bank } from "../auth/Bank"
import { Money } from "../auth/Money";
import { Categories } from "./Categories";
import { BtnTransfer } from "./BtnTransfer";
import type { ChildrenValue } from "../../types/Types"
import { Memo } from "./Memo";


export const TransferInfo = (): JSX.Element => {
    const [account, setAccount] = useState<ChildrenValue>({ value: "", valid: false })
    const [bank, setBank] = useState<ChildrenValue>({ value: "", valid: false })
    const [money, setMoney] = useState<ChildrenValue>({ value: "", valid: false })
    const [accountPW, setAccountPW] = useState<ChildrenValue>({ value: "", valid: false })
    const [category, setCategory] = useState<ChildrenValue>({ value: "", valid: false })
    const [memo, setMemo] = useState<ChildrenValue>({ value: "", valid: true })

    const transferInfo = {
        account: account.value,
        bank: bank.value,
        money: money.value,
        accountPW: accountPW.value,
        category: category.value,
        memo: memo.value,
        valid: account.valid && bank.valid && money.valid && accountPW.valid && category.valid
    }

    const handleAccount = useCallback((newAccount: ChildrenValue) => {
        setAccount(newAccount)
    }, [])

    const handleBank = useCallback((newBank: ChildrenValue) => {
        setBank(newBank)
    }, [])

    const handleMoney = useCallback((money: ChildrenValue) => {
        setMoney(money)
    }, [])

    const handleAccountPW = useCallback((newAccountPW: ChildrenValue) => {
        setAccountPW(newAccountPW)
    }, [])

    const handleCategory = useCallback((newCategory: ChildrenValue) => {
        setCategory(newCategory)
    }, [])

    const handleMemo = useCallback((newMemo: ChildrenValue) => {
        setMemo(newMemo)
    }, [])

    console.log(account, bank, accountPW, money, category, memo)


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (<>
        <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-center">
                <div className="w-[330px] mb-16">
                    <Account onValueChange={handleAccount} />
                    <Bank onValueChange={handleBank} />
                    <Money onValueChange={handleMoney} />
                    <Categories onValueChange={handleCategory} />
                    <Memo onValueChange={handleMemo} />
                    <AccountPW onAccountPWChange={handleAccountPW} />
                    <BtnTransfer transferInfoProps={transferInfo} />




                </div>
            </div>
        </form>
    </>);
};
