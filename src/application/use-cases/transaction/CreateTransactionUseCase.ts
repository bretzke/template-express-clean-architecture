import { inject, injectable } from 'tsyringe';
import { CreateTransactionDTO } from '../../dtos/transaction/CreateTransactionDTO';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { TransactionCreatedResponseDTO } from '../../dtos/transaction/TransactionCreatedResponseDTO';
import { ILockProvider } from '@/domain/providers/ILockProvider';
import { INumeratorProvider } from '@/domain/providers/INumeratorProvider';
import { DependencyTokens } from '@/infra/di/dependencyTokens';

@injectable()
export class CreateTransactionUseCase {
  constructor(
    @inject(DependencyTokens.TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
    @inject(DependencyTokens.LOCK_PROVIDER)
    private readonly lockProvider: ILockProvider,
    @inject(DependencyTokens.NUMERATOR_PROVIDER)
    private readonly numeratorProvider: INumeratorProvider
  ) {}

  async execute(data: CreateTransactionDTO): Promise<TransactionCreatedResponseDTO> {
    const uniqueNumerator = await this.generateUniqueNumerator();

    const newTransaction = await this.transactionRepository.create({
      id: uniqueNumerator.toString(),
      ...data,
    });

    return { transaction: newTransaction };
  }

  private async generateUniqueNumerator(): Promise<number> {
    await this.lockProvider.acquireLock();

    const numerator = await this.numeratorProvider.getNumerator();
    this.numeratorProvider.testAndSetNewNumerator({
      oldValue: numerator,
      newValue: numerator + 1,
    });

    await this.lockProvider.releaseLock();

    return numerator;
  }
}
