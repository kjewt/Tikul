
import { Background } from "../common/Background"
import { InputInfo } from "./InputInfo";


export const RegisterInfo = () => {


    return (<>
        <Background margin="mt-12">
            <div>계좌가 등록되어 있지 않습니다!<br /> 먼저 계좌를 등록해주세요.</div>
            <InputInfo />
        </Background>

    </>)
}