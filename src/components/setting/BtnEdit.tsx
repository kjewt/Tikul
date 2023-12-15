import { useState } from "react";

export const BtnEdit = () => {
    const [isInputVisible, setIsInputVisible] = useState(false);

    const handleButtonClick = () => {
        setIsInputVisible((prev) => (!prev));
    };

    return (
        <>
            <button onClick={handleButtonClick} className="btn btn-primary btn-outline w-[330px]">
                수정하기
            </button>
            {isInputVisible && (
                <input
                    type="text"
                    placeholder="계좌 비밀번호 6자리를 입력해주세요."
                    className="input input-bordered input-primary w-[330px]"
                />
            )}
        </>
    );
};
