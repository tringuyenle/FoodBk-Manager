import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import { requireAdmin, requireUser } from '../../middlewares/requireUser';
import catchAsync from '../../utils/catchAsync';
import { TransactionSchema } from './transaction.schema';
import { createTransactionController, getAllTransactionsController, getMyTransactionsController, getTransactionsByUserIdController, updateTransactionStatusController } from './transaction.controller';
const transactionRouter = express.Router();

transactionRouter.post('/create',requireUser,processRequestBody(TransactionSchema), catchAsync(createTransactionController))
transactionRouter.get('/getAll', requireAdmin,catchAsync(getAllTransactionsController)) 
transactionRouter.get('/getMyTransactions', requireUser, catchAsync(getMyTransactionsController))
transactionRouter.get('/getByUserId/:userId', requireAdmin, catchAsync(getTransactionsByUserIdController))
transactionRouter.post('/updateStatus/:transactionId', requireAdmin, catchAsync(updateTransactionStatusController))

export default transactionRouter;