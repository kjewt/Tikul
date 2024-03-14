export const TimeFormatter = (time: Date) => {

    if (!(time instanceof Date)) { return } else {
        return new Date(time)
    }
}
