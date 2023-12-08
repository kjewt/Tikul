export const PwDoubleCheckValid = (password1: string, password2: string) => {
    if (password1 === "" || password2 === "") return false
    if (password1 === password2) return true
    else return false
}