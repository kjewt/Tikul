import { Link } from "react-router-dom";
// import AddMoneyInput from './AddMoneyInput';

export const AddMoney = (): JSX.Element => {


    return (
        <>
            <div className="container min-h-screen">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="py-3">충전하기</p>
                    </div>
                    <div className="card w-96 bg-accent shadow-xl">
                        <div className="m-3 rounded-xl bg-base-100">
                            <Link to="/home/banking" className="px-4 pt-4 text-sm link-primary underline">이전으로</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

};


