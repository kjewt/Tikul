import { useCallback, useState } from "react"
import { useQueryClient } from "react-query";

import type { ValueProps, AccountDataType } from '../../types/Types';

export const Categories = ({ onValueChange }: ValueProps): JSX.Element => {
    const [, setCategory] = useState("기타")
    const queryClient = useQueryClient();
    const freshAccountData = queryClient.getQueryData<AccountDataType>("fetchAccountData");

    if (!freshAccountData) return <div>카테고리 정보가 없습니다.</div>

    const categories = freshAccountData.categories

    const handleCategoryChange = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedCategory = event.currentTarget.textContent;
        if (clickedCategory) {

            setCategory(clickedCategory);
            onValueChange({ value: clickedCategory, valid: true })

            const allButtons = document.querySelectorAll(".btn");
            allButtons.forEach(button => button.classList.remove("btn-accent"));

            event.currentTarget.classList.add('btn-accent');
        }
    }, [onValueChange]);

    console.log(categories)



    return (<>
        <div>
            <label className="label">
                <span className="label-text">카테고리</span>

            </label>
            <div className="p-1">
                {categories.map((category, index) =>
                    <button key={index} onClick={handleCategoryChange} className="btn btn-sm btn-secondary m-1">{category}</button>)}

            </div>

        </div>

    </>)
}