import { useRecoilState } from 'recoil';
import { accountDataState } from "../../state/atoms"

export const Categories = (): JSX.Element => {
    const [accountData] = useRecoilState(accountDataState);
    const categories = accountData.categories



    return (<>
        <div>
            <label className="label">
                <span className="label-text">카테고리</span>

            </label>
            <div className="p-1">
                {categories.map((category, index) => <button key={index} className="badge badge-secondary badge-md m-1">{category}</button>)}

            </div>

        </div>

    </>)
}