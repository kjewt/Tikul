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

//atom 타입
type commonType = string | null;

export type AccountData = {
  IsRegister: boolean;
  account: commonType;
  accountPW: commonType;
  balance: number;
  bank: commonType;
  email: commonType;
  name: commonType;
};
