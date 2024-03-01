import { useCallback, useState } from "react"
import { useRecoilState } from 'recoil';
import { accountDataState } from "../../state/atoms"
import type { CategoryProps } from '../../types/Types';

export const Categories = ({ onCategoryChange }: CategoryProps): JSX.Element => {
    const [accountData] = useRecoilState(accountDataState);
    const [, setCategory] = useState("기타")
    const categories = accountData.categories

    const handleCategoryChange = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        const clickedCategory = event.currentTarget.innerText;
        setCategory(clickedCategory);
        onCategoryChange({ value: clickedCategory, valid: true })
    }, [])



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