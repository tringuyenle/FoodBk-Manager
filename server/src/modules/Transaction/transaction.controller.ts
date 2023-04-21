import { TransactionInfo, TransactionItemInfo } from "./transaction.schema";
import { NextFunction, Request, Response } from "express";
import { createTransaction, getAllTransactions, getTotalPriceToday, getTransactionByUserId, updateTransactionStatus } from "./transaction.service";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../../utils/expressError";

export const createTransactionController = async (req: Request<{},{},TransactionInfo>, res : Response, next: NextFunction) => {
    const {id} = res.locals.user;
    const newTransaction = await createTransaction(req.body,id);
    if(!newTransaction){
        return next(new ExpressError('Transaction not created', StatusCodes.BAD_REQUEST));
    }
    res.status(StatusCodes.CREATED).send(newTransaction);
}
export const getAllTransactionsController = async (req: Request, res: Response, next: NextFunction) => {
    const transactions = await getAllTransactions();
    if(!transactions){
        return next(new ExpressError('No transactions found', StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.OK).send(transactions);
}

export const getMyTransactionsController = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = res.locals.user;
    const transactions = await getTransactionByUserId(id);
    if(!transactions){
        return next(new ExpressError('No transactions found', StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.OK).send(transactions);
}

export const getTransactionsByUserIdController = async (req: Request<{userId : string}>, res: Response, next: NextFunction) => {
    const {userId} = req.params;
    const transactions = await getTransactionByUserId(userId);
    if(!transactions){
        return next(new ExpressError('No transactions found', StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.OK).send(transactions);
}

export const updateTransactionStatusController = async (req: Request<{transactionId : string}, {}, {status : string}>, res: Response, next: NextFunction) => {
    const {transactionId} = req.params;
    const {status} = req.body;
    const transaction = await updateTransactionStatus(transactionId, status);
    if(!transaction){
        return next(new ExpressError('No transactions found', StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.OK).send(transaction);
}