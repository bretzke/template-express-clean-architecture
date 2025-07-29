import { Transaction } from '../entities/Transaction';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  getAllTransactions(): Promise<Transaction[]>;
  getTransactionById(transactionId: string): Promise<Transaction | null>;
  delete(transactionId: string): Promise<Transaction | null>;
}
