import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { NumberFormat } from "../../business/NumberFormat";

type CategoriesListProps = {
    thisMonth: number,
    lastMonth: number,
}
export const CategoriesList = ({ thisMonth, lastMonth }: CategoriesListProps) => {

    const change = lastMonth - thisMonth

    if (change === 0) return (
        <span>
            <span className="">{NumberFormat(change)}원</span>
        </span>)

    if (change > 0) return (
        <span className="flex gap-1">
            <AiFillCaretDown className="text-blue-500 flex justify-center mt-[3px]" />
            <span className="text-blue-500">{NumberFormat(change)}원</span>
        </span>)

    if (change < 0) return (
        <span className="flex gap-1">
            <AiFillCaretUp className="text-red-500 flex justify-center mt-[3px]" />
            <span className="text-red-500">{NumberFormat(Math.abs(change))}원</span>
        </span>)


}