import { useState, useCallback } from 'react';
import { AiFillAlert } from "react-icons/ai";


export const KeyPad = ({ onPWChange }: { onPWChange: (num: string) => void }) => {
    const [inputValue, setInputValue] = useState('');

    const handleButtonClick = useCallback((num: string) => {
        if (inputValue.length < 6) {
            const newValue = inputValue + num;
            setInputValue(newValue);
            onPWChange(newValue);
        }
    }, [inputValue, onPWChange]);

    const handleBackspaceClick = useCallback(() => {
        setInputValue((prevValue) => {
            const newValue = prevValue.slice(0, -1);
            onPWChange(newValue);
            return newValue;
        });
    }, [onPWChange]);

    const handleClearClick = useCallback(() => {
        setInputValue('');
        onPWChange('');
    }, [onPWChange]);


    return (
        <>



            <div className="shadow-xl rounded-xl">
                <div className="flex mx-3 mt-2 text-primary ">
                    <AiFillAlert />
                    <span className="text-sm">&nbsp;키보드 보안 시스템 작동 중입니다.</span>
                </div>
                <div className="grid grid-cols-3 grid-rows-4 gap-1 p-2 card-body shadow-">
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("1")}>1</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("2")}>2</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("3")}>3</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("4")}>4</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("5")}>5</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("6")}>6</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("7")}>7</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("8")}>8</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("9")}>9</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={handleClearClick}>초기화</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={() => handleButtonClick("0")}>0</button>
                    <button className="btn btn-primary btn-sm text-base-100" onClick={handleBackspaceClick}>지우기</button>

                </div>
            </div>

        </>

    );
};
