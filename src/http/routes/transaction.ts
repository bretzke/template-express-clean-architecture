import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const router = Router();
const controller = new TransactionController();

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.delete('/:id', controller.delete);

export { router as transactionRoutes };
