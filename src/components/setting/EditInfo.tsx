
import { Background } from "../common/Background";
import { InputInfo } from "./InputInfo"
import { FaIdCard } from "react-icons/fa";
import { CardSection } from "./CardSection";
import { BtnEdit } from "./BtnEdit";



export const EditInfo = () => {


    return (<>
        <Background margin="mt-12">
            <div className="flex justify-center items-center gap-2 mb-4">

                <FaIdCard className="text-xl" />
                <div className="text-xl flex items-center">등록 계좌</div>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <CardSection />
                <BtnEdit />
                <InputInfo />
            </div>
        </Background>

    </>)
}