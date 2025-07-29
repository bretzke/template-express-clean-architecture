import { TransactionType } from '@/domain/entities/Transaction';
import z from 'zod';

const convertToDecimalString = (value: number) => value.toFixed(2);

export const createTransactionSchema = z.object({
  description: z.string(),
  method: z.enum([TransactionType.CREDIT_CARD, TransactionType.DEBIT_CARD]),
  value: z.number().transform(convertToDecimalString),
  cardNumber: z.string().regex(/^\d{4}$/, {
    message: 'Card number must have exactly 4 digits',
  }),
  cardHolderName: z.string(),
  cardHocardExpirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: 'Date must be in the format mm/yy',
  }),
  cardCvv: z.string().regex(/^\d{3,4}$/, { message: 'CVV must have 3 or 4 digits' }),
});

export type CreateTransactionDTO = z.infer<typeof createTransactionSchema>;
