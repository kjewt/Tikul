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
    categories: [],
  },
});
