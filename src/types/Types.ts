import {Timestamp} from "firebase/firestore";

export type ChildrenValue = {
  value: string;
  valid: boolean;
};

export type ValueProps = {
  onValueChange: (childValue: ChildrenValue) => void;
};

export type CbxProps = {
  onCbxChange: (value: boolean) => void;
};

export type CategoryDataType = {
  category: string;
  thisMonth: number;
  lastMonth: number;
};

// 카테고리 클래스와 타입
export class CategoryData {
  category: string;
  thisMonth: number;
  lastMonth: number;

  constructor(category: string, thisMonth: number, lastMonth: number) {
    this.category = category;
    this.thisMonth = thisMonth;
    this.lastMonth = lastMonth;
  }

  toJSON() {
    return {
      category: this.category,
      thisMonth: this.thisMonth,
      lastMonth: this.lastMonth,
    };
  }
}

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
  timestamp: Timestamp;
  detail: string;
  memo: string;
  transactionType: string;
  category: string;
  amount: number;
};

export type AccountSendHistoryItem = {
  timestamp: Date;
  detail: string;
  memo: string;
  transactionType: string;
  category: string;
  amount: number;
};

export type TransferDataType = {
  account: string;
  bank: string;
  money: string;
  accountPW: string;
  category: string;
  memo: string;
  valid: boolean;
};

//business Logic

export type DateFormatterType = {
  date: Date;
  isDetail: boolean;
};
