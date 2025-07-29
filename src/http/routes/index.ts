import { Router } from 'express';
import { transactionRoutes } from './transaction';

const router = Router();

router.use('/transactions', transactionRoutes);

export { router };
