import { useState, useCallback } from "react"
import type { MemoProps } from "../../types/Types"

export const Memo = ({ onMemoChange }: MemoProps) => {
    const [memo, setMemo] = useState("")

    const handleMemoChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const content = event.target.value
        if (content.length > 20) return
        setMemo(content)
        onMemoChange({ value: content, valid: true })
    }, [])


    return (<>
        <div className="form-control">
            <label className="label justify-start gap-2">
                <span className="label-text">메모</span>
                <div className="badge badge-primary badge-outline">선택</div>
            </label>

            <input onChange={handleMemoChange} className="textarea textarea-primary" placeholder="20자 이내로 작성해주세요." value={memo}></input>
        </div>
    </>)
}