import {atom} from "recoil";
import type {AccountDataType} from "../types/Types";

export const accountDataState = atom<AccountDataType>({
  key: "accountDataState",
  default: {
    IsRegister: false,
    account: null,
    accountPW: null,
    balance: 0,
    bank: null,
    email: null,
    name: null,
  },
});

// for Join

export const isEmailState = atom({
  key: "isEmailState",
  default: false,
});

export const isSamePassportState = atom({
  key: "isSamePassportState",
  default: false,
});

export const isCorrectAccountPasswordState = atom({
  key: "isCorrectAccountPasswordState",
  default: false,
});

export const isAccountState = atom({
  key: "isAccountState",
  default: false,
});

export const isSameAccountPassportState = atom({
  key: "isSameAccountPassportState",
  default: false,
});

export const isCheckedState = atom({
  key: "isCheckedState",
  default: false,
});
// for adding

export const selectedDateState = atom({
  key: "selectedDateState", // unique ID (with respect to other atoms/selectors)
  default: new Date(), // default value (aka initial value)
});

// for transfer, addMoney
export const isBankingState = atom({
  key: "isBankingState",
  default: 0, // 0 -> banking , 1 -> transfer , 2 -> addMoney
});

export const balanceState = atom({
  key: "balanceState",
  default: 0,
});

export const transferBankNameState = atom({
  key: "transferBankNameState",
  default: "",
});

//for filter

export const filteredTransactionsState = atom<any[]>({
  key: "filteredTransactionsState",
  default: [],
});

const today = new Date();
export const filterMonthSate = atom({
  key: "filterMonthSate",
  default: today.getMonth() + 1,
});

export const filterYearSate = atom({
  key: "filterYearSate",
  default: today.getFullYear(),
});
