export enum TransactionType {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
}

export interface Transaction {
  id: string;
  value: string;
  description: string;
  method: TransactionType;
  cardNumber: string;
  cardHolderName: string;
  cardHocardExpirationDate: string;
  cardCvv: string;
}
