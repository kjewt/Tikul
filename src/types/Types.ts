export type ChildrenValue = {
  value: string;
  valid: boolean;
};

export type EmailProps = {
  onEmailChange: (childValue: ChildrenValue) => void;
};

export type PasswordProps = {
  onPasswordChange: (childValue: ChildrenValue) => void;
};

export type CbxProps = {
  onCbxChange: (value: boolean) => void;
};

export type NameProps = {
  onNameChange: (childValue: ChildrenValue) => void;
};

export type AccountProps = {
  onAccountChange: (childValue: ChildrenValue) => void;
};
export type AccountPWProps = {
  onAccountPWChange: (childValue: ChildrenValue) => void;
};

export type BankProps = {
  onBankChange: (childValue: ChildrenValue) => void;
};

export type MoneyProps = {
  onMoneyChange: (childValue: ChildrenValue) => void;
};

export type CategoryProps = {
  onCategoryChange: (childValue: ChildrenValue) => void;
};

//atom 타입
export type commonType = string | null;

export type AccountDataType = {
  IsRegister: boolean;
  account: commonType;
  accountPW: commonType;
  balance: number;
  bank: commonType;
  email: commonType;
  name: commonType;
  categories: Array<string>;
};

export type AccountHistoryItem = {
  timestamp: Date;
  detail: string;
  memo: string;
  transactionType: string;
  category: string;
  amount: number;
};

//business Logic

export type DateFormatterType = {
  date: Date;
  isDetail: boolean;
};
