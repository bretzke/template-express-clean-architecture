import { Transaction } from '@/domain/entities/Transaction';

export interface TransactionCreatedResponseDTO {
  transaction: Transaction;
}
