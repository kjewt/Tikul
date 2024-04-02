import { Timestamp } from "firebase/firestore";

export const TimeFormatter = (time: Timestamp) => {

    const date = time.toDate()
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const formattedDate = ` ${month}월 ${day}일`;

    return formattedDate
}
