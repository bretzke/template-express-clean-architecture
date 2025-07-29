import { inject, injectable } from 'tsyringe';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { Transaction } from '@/domain/entities/Transaction';
import { AppError } from '@/shared/errors/AppError';
import { ErrorMessages } from '@/shared/errors/ErrorMessages';
import { DependencyTokens } from '@/infra/di/dependencyTokens';

@injectable()
export class GetTransactionByIdUseCase {
  constructor(
    @inject(DependencyTokens.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository
  ) {}

  async execute(transactionId: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.getTransactionById(transactionId);

    if (!transaction) {
      throw new AppError(ErrorMessages.TRANSACTION_NOT_FOUND);
    }

    return transaction;
  }
}
