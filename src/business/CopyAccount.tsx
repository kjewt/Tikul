import { commonType } from "../types/Types";

export const CopyAccount = (bank: commonType, account: commonType) => {
    const infoToCopy = `예금주: ${bank}, 계좌번호: ${account}`;
    navigator.clipboard.writeText(infoToCopy);

    alert('계좌 정보가 복사되었습니다.');
};