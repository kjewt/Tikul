import { Link } from "react-router-dom"

export const BtnTransfer = () => {


    return (
        <>
            <div className="flex flex-col gap-2 mt-4">
                <button
                    className={`btn btn-primary w-full text-base-100`}>  송금
                </button>
                <Link to="/home/banking"><div className="btn btn-primary btn-outline w-full">등록취소</div></Link>
            </div>

            <dialog id="my_modal_1" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">입력 정보를 다시 확인해주세요!</h3>
                    <div className="py-4 flex-col text-left">
                        {/* <p>{`예금주: ${name.value}`}</p>
                    <p>{`계좌번호 : ${account.value}`}</p>
                    <p>{`은행 : ${bank.value}`}</p> */}
                    </div>


                </div>
            </dialog>
        </>
    )
}