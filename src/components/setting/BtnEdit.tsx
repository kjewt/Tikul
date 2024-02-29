import { useState } from "react";
import { InputInfo } from "./InputInfo";
import { AccountPW } from "../auth/AccountPW";
import type { ChildrenValue, commonType } from "../../types/Types";

type pwType = {
    pw: commonType
}



export const BtnEdit = ({ pw }: pwType) => {
    const [accountPW, setAccountPW] = useState({ value: "", valid: false })
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [isEditAreaOpen, setIsEditAreaOpen] = useState(false)

    const handleButtonClick = () => {
        setIsInputVisible((prev) => (!prev));
        setIsEditAreaOpen(false)
    };

    const handlePWCheck = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (pw === accountPW.value) {
            setIsEditAreaOpen(true);
        }

        if (pw !== accountPW.value) {
            setAccountPW({ value: "", valid: false });
            const modalElement = document.getElementById('my_modal_3') as HTMLDialogElement | null;
            if (modalElement) {
                modalElement.showModal();
            }
        }
    };


    const handleAccountPW = (newAccountPW: ChildrenValue) => {
        setAccountPW(newAccountPW)
    }

    return (
        <>
            <button onClick={handleButtonClick} className="btn btn-primary btn-outline w-[330px]">
                수정하기
            </button>
            {isInputVisible && (
                <>
                    <form>
                        <AccountPW onAccountPWChange={handleAccountPW} width={`w-[330px]`} />
                        <button onClick={handlePWCheck} className="btn btn-primary w-[330px] mt-4">
                            확인
                        </button>
                    </form>
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <h3 className="font-bold text-lg">계좌 비밀번호가 틀렸습니다!</h3>
                            <p className="py-4">숫자 6자리로 작성해주세요.</p>
                        </div>
                    </dialog>
                </>
            )}
            {isEditAreaOpen && (<InputInfo />)}

        </>
    );
};
