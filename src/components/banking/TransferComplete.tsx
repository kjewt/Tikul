import { Link } from "react-router-dom"

export const TransferComplete = (): JSX.Element => {


    return (
        <div className="card-body">
            <hr />
            <div className="text-center p-4"> 송금을 완료했습니다! 🎉</div>
            <div className="btn-banking p-4 flex justify-around gap-1">
                <Link to="./home/banking">
                    <button className="btn btn-outline btn-primary w-1/2 btn-hover">이전화면으로</button>
                </Link>
            </div>
        </div>
    );
};

