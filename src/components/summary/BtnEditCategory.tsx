import { useState, useCallback } from "react"
import { FaEdit } from "react-icons/fa";
import { Api_EditCategory } from "../../api/SummaryUtils"

type BtnEditCategoryType = {
    category: string
}

export const BtnEditCategory = ({ category }: BtnEditCategoryType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [newCategory, setNewCategory] = useState<string>("")


    const handleModalOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setIsOpen(false);
    }, []);


    const handleInputValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const newCategory = event.target.value
        setNewCategory(newCategory)
    }, [])


    return (
        <form onSubmit={(e) => e.preventDefault()} >
            <button onClick={handleModalOpen} >
                <FaEdit className="text-xl text-primary mt-1" />
            </button>
            {isOpen && (
                <div className="flex gap-1" onMouseLeave={handleModalClose}>
                    <input value={newCategory} type="text" placeholder="카테고리" className="input input-bordered input-sm w-24 max-w-xs" onChange={handleInputValue} />
                    <button className="btn btn-sm" onClick={() => Api_EditCategory(category, newCategory)}>등록</button>
                </div>
            )}
        </form>
    )
}