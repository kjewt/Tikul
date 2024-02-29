import type {AccountDataType} from "../types/Types";

export const initialAccountData: AccountDataType = {
  IsRegister: false,
  account: null,
  accountPW: null,
  balance: 0,
  bank: null,
  email: null,
  name: null,
  categories: ["식비", "생활", "쇼핑", "주거/통신", "교통", "의료", "기타"],
};
