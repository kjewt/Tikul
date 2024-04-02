import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { Name } from "../auth/Name"
import { Account } from "../auth/Account"
import { AccountPWCheck } from "../auth/AccountPWCheck"
import { Bank } from "../auth/Bank"
import { Api_Register } from "../../api/InfoUtils"
import type { ChildrenValue } from "../../types/Types"

export const InputInfo = () => {

    const navigate = useNavigate();
    const [name, setName] = useState<ChildrenValue>({ value: "", valid: false })
    const [account, setAccount] = useState<ChildrenValue>({ value: "", valid: false })
    const [accountPW, setAccountPW] = useState<ChildrenValue>({ value: "", valid: false })
    const [bank, setBank] = useState<ChildrenValue>({ value: "", valid: false })
    const [, setIsOpenModal] = useState(false)

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

    const handleRegisterInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        Api_Register({ account: account.value, pw: accountPW.value, bank: bank.value, name: name.value, navigate })
    }

    const handleOpenModal = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const modalElement = document.getElementById('my_modal_1') as HTMLDialogElement | null;

        if (modalElement) {
            modalElement.showModal();
        }
        setIsOpenModal(true)
    }

    return (
        <>
            <form>
                <div className="flex items-center justify-center mt-8">
                    <div className="w-[330px] mb-16">
                        <Name onValueChange={handleName} />
                        <Account onValueChange={handleAccount} />
                        <Bank onValueChange={handleBank} />
                        <AccountPWCheck onValueChange={handleAccountPW} />
                        <button disabled={!validTest} className="btn btn-primary w-full mt-6" onClick={handleOpenModal}>등록하기</button>




                        <Link to="/home"><div className="btn btn-primary btn-outline w-full my-4">등록취소</div></Link>

                    </div>
                </div>
            </form>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">입력 정보를 다시 확인해주세요!</h3>
                    <div className="py-4 flex-col text-left">
                        <p>{`예금주: ${name.value}`}</p>
                        <p>{`계좌번호 : ${account.value}`}</p>
                        <p>{`은행 : ${bank.value}`}</p>
                    </div>

                    <div className="modal-action">
                        <form method="dialog ">
                            <button onClick={handleRegisterInfo} className="btn btn-primary btn-outline mr-2">등록하기</button>
                            <button className="btn btn-primary">돌아가기</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>)
}