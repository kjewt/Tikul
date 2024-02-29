import { DateFormatterType } from "../types/Types";

export const dateFormatter = ({ date, isDetail }: DateFormatterType) => {

    const detailDateForm = new Intl.DateTimeFormat('ko', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
    const shortDateForm = new Intl.DateTimeFormat('en', {
        month: '2-digit',
        day: '2-digit',
    });


    if (isDetail) {
        return detailDateForm.format(date)
    } else {
        return shortDateForm.format(date)
    }
}