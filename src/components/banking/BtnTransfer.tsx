import { Link, useNavigate } from "react-router-dom";
import { Api_transferMutation } from "../../api/InfoUtils";
import type { TransferDataType } from "../../types/Types";

export const BtnTransfer = ({ transferInfoProps }: { transferInfoProps: TransferDataType }): JSX.Element => {
    const navigate = useNavigate();
    const { mutate, isLoading, isError } = Api_transferMutation();

    const handleTransferClick = () => {
        // useMutation의 mutate 함수를 호출하여 비동기 작업 실행
        mutate({ transferInfoProps, navigate });
    };

    return (
        <div>
            <div className="flex flex-col gap-2 mt-4">
                <button onClick={handleTransferClick} className={`btn ${transferInfoProps.valid ? "btn-primary" : "btn-disabled"} w-full text-base-100`}>
                    {(!isLoading) ? "송금" : (<span className="loading loading-spinner"></span>)}
                </button>
                <Link to="/home/banking">
                    <div className="btn btn-primary btn-outline w-full">등록취소</div>
                </Link>
            </div>
        </div>
    );
};
