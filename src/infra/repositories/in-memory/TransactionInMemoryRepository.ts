import { Transaction } from '@/domain/entities/Transaction';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';

export class TransactionInMemoryRepository implements ITransactionRepository {
  private static transactions: Transaction[] = [];

  async create(transaction: Transaction): Promise<Transaction> {
    TransactionInMemoryRepository.transactions.push(transaction);

    return transaction;
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return TransactionInMemoryRepository.transactions;
  }

  async getTransactionById(transactionId: string): Promise<Transaction | null> {
    const selectedTransaction =
      TransactionInMemoryRepository.transactions.find(
        (transaction) => transaction.id === transactionId
      ) || null;

    return selectedTransaction;
  }

  async delete(transactionId: string): Promise<Transaction | null> {
    const index = TransactionInMemoryRepository.transactions.findIndex(
      (transaction) => transaction.id === transactionId
    );

    if (index < 0) {
      return null;
    }

    const [deletedTransaction] = TransactionInMemoryRepository.transactions.splice(index, 1);
    return deletedTransaction;
  }
}
