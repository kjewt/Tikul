import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Name } from "../auth/Name"
import { Account } from "../auth/Account"
import { AccountPassword } from "../auth/AccountPassword"
import { Bank } from "../auth/Bank"
import { Api_Register } from "../../api/InfoUtils"
import type { ChildrenValue } from "../../types/authTypes"

export const InputInfo = () => {

    const navigate = useNavigate();
    const [name, setName] = useState<ChildrenValue>({ value: "", valid: false })
    const [account, setAccount] = useState<ChildrenValue>({ value: "", valid: false })
    const [accountPW, setAccountPW] = useState<ChildrenValue>({ value: "", valid: false })
    const [bank, setBank] = useState<ChildrenValue>({ value: "", valid: false })

    const handleName = (newName: ChildrenValue) => {
        setName(newName)
    }

    const handleAccount = (newAccount: ChildrenValue) => {
        setAccount(newAccount)
    }
    const handleAccountPW = (newAccountPW: ChildrenValue) => {
        setAccountPW(newAccountPW)
    }
    const handleBank = (newBank: ChildrenValue) => {
        setBank(newBank)
    }

    const validTest = account.valid && accountPW.valid && bank.valid

    const handleRegisterInfo = () => {
        Api_Register({ account: account.value, pw: accountPW.value, bank: bank.value, name: name.value, navigate })

    }
    return (<>
        <div className="flex items-center justify-center mt-8">
            <div className="w-[330px] mb-16">
                <Name onNameChange={handleName} />
                <Account onAccountChange={handleAccount} />
                <Bank onBankChange={handleBank} />
                <AccountPassword onAccountPWChange={handleAccountPW} />
                <button disabled={!validTest} className="btn btn-primary w-full mt-6" onClick={() => document.getElementById('my_modal_1')?.showModal()}>등록하기</button>
                <button className="btn btn-primary btn-outline w-full my-4">등록취소</button>
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">입력 정보를 다시 확인해주세요!</h3>
                        <div className="py-4 flex-col text-left">
                            <p>{`예금주: ${name.value}`}</p>
                            <p>{`계좌번호 : ${account.value}`}</p>
                            <p>{`은행 : ${bank.value}`}</p>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button onClick={handleRegisterInfo} className="btn btn-primary btn-outline mr-2">등록하기</button>
                                <button className="btn btn-primary">돌아가기</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    </>)
}