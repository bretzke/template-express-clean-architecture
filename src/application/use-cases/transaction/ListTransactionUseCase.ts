import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { Transaction } from '@/domain/entities/Transaction';
import { DependencyTokens } from '@/infra/di/dependencyTokens';

@injectable()
export class ListTransactionUseCase {
  constructor(
    @inject(DependencyTokens.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(): Promise<Transaction[]> {
    const transactions = await this.transactionRepository.getAllTransactions();

    return transactions;
  }
}
