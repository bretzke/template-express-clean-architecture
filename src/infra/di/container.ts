import 'reflect-metadata';
import { container } from 'tsyringe';
import { ITransactionRepository } from '@/domain/repositories/ITransactionRepository';
import { LockInMemoryProvider } from '../providers/in-memory/LockInMemoryProvider';
import { NumeratorInMemoryProvider } from '../providers/in-memory/NumeratorInMemoryProvider';
import { ILockProvider } from '@/domain/providers/ILockProvider';
import { INumeratorProvider } from '@/domain/providers/INumeratorProvider';
import { TransactionInMemoryRepository } from '../repositories/in-memory/TransactionInMemoryRepository';
import { DependencyTokens } from './dependencyTokens';

container.registerSingleton<ILockProvider>(DependencyTokens.LOCK_PROVIDER, LockInMemoryProvider);

container.registerSingleton<INumeratorProvider>(
  DependencyTokens.NUMERATOR_PROVIDER,
  NumeratorInMemoryProvider
);

container.registerSingleton<ITransactionRepository>(
  DependencyTokens.TRANSACTION_REPOSITORY,
  TransactionInMemoryRepository
);
