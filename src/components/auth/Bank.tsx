import { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { BankProps } from '../../types/authTypes';

export const Bank = ({ onBankChange }: BankProps): JSX.Element => {
    const [selectedBank, setSelectedBank] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const bankNames = ['NH농협', 'KB국민', '신한', '우리', 'IBK기업', '하나', '새마을금고', '카카오뱅크', '토스뱅크', '케이뱅크', '부산', '대구', '신협', 'SC제일', '씨티'];

    const handleItemClick = (item: string) => {
        setSelectedBank(item);
        onBankChange({ value: item, valid: true })
        setIsOpen(false);

    };

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* 은행선택 드롭다운 */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">은행 선택</span>
                </label>
                <div className="dropdown" >
                    <label tabIndex={0} className="btn btn-outline btn-primary justify-between text-accent w-full" onClick={toggleDropDown}>
                        {selectedBank === "" ?
                            <span className="label-text text-accent text-base">은행을 선택하세요.</span> :
                            <span className="label-text">{selectedBank}</span>
                        }
                        <FaChevronDown />
                    </label>
                    {isOpen &&
                        (<ul tabIndex={0} className={`dropdown-content grid grid-cols-2 w-full z-[1] menu p-2 shadow bg-base-100 rounded-box`}>
                            {bankNames.map((bankName, index) => (
                                <li key={index}>
                                    <a onClick={() => handleItemClick(bankName)}>{bankName}</a>
                                </li>
                            ))}
                        </ul>)}

                </div>
            </div>
        </>
    );
};

