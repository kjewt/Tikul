import { FaRegCopy } from "react-icons/fa";

type AlertPropsType = {
    content: string;
}

export const Alert = ({ content }: AlertPropsType) => {


    return (
        <div role="alert" className="alert fixed z-10 w-60">
            <FaRegCopy />
            <span>{content}</span>
        </div>
    )
}