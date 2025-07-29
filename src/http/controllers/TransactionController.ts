import { createTransactionSchema } from '@/application/dtos/transaction/CreateTransactionDTO';
import { CreateTransactionUseCase } from '@/application/use-cases/transaction/CreateTransactionUseCase';
import { DeleteTransactionUseCase } from '@/application/use-cases/transaction/DeleteTransactionUseCase';
import { GetTransactionByIdUseCase } from '@/application/use-cases/transaction/GetTransactionByIdUseCase';
import { ListTransactionUseCase } from '@/application/use-cases/transaction/ListTransactionUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class TransactionController {
  async create(req: Request, res: Response): Promise<Response> {
    const createTransactionDto = createTransactionSchema.parse(req.body);

    const createTransaction = container.resolve(CreateTransactionUseCase);
    const { transaction } = await createTransaction.execute(createTransactionDto);

    return res.status(201).json({ transaction });
  }

  async list(req: Request, res: Response): Promise<Response> {
    const listTransaction = container.resolve(ListTransactionUseCase);
    const transactions = await listTransaction.execute();

    return res.status(200).json(transactions);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getTransactionById = container.resolve(GetTransactionByIdUseCase);
    const transaction = await getTransactionById.execute(id);

    return res.status(200).json(transaction);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteTransaction = container.resolve(DeleteTransactionUseCase);
    const deletedTransaction = await deleteTransaction.execute(id);

    return res.status(200).json(deletedTransaction);
  }
}
