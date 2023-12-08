export const BtnEmailCheck = (): JSX.Element => {

    const handleModal = () => {
        const btnCheckEmail = document.getElementById("my_modal_5") as HTMLDialogElement;
        btnCheckEmail?.showModal()
    }
    //이메일 중복 통과하면 버튼 내용 "중복 확인 -> 사용 가능"으로 바뀌도록 수정 필요

    return (
        <>
            <button className="btn btn-primary" onClick={handleModal}>중복 확인</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">이메일 중복 체크</h3>
                    <p className="py-4 text-primary">사용가능한 이메일입니다.</p>
                    <p className="py-4 text-primary">이미 사용 중인 이메일입니다.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">닫기</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};
