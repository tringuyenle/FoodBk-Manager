import { TransactionInfo } from './transaction.schema';
import prisma from "../../utils/prisma";

export const createTransaction = async (input : TransactionInfo, userId : string) => {
    const {
        transactionItem, 
        status, 
        typeOfTransaction, 
        phone, 
        address, 
        note,
        total
    } = input;

    const transaction = await prisma.transaction.create({
        data : {
            userId : userId,
            status: status,
            phone : phone,
            address : address,
            note: note,
            total : total,
            typeOfTransaction: typeOfTransaction
        },
        select : {
            id: true
        }
    })

    for (let i = 0 ; i < transactionItem.length; i++){
        await prisma.transactionItem.create({
            data: {
                foodId: transactionItem[i].foodId,
                quantity: transactionItem[i].quantity,
                itemNote: transactionItem[i].itemNote,
                transactionID : transaction.id
            }
        })
    }

    return transaction;
}

export const getAllTransactions = async () => {
    const transactions = await prisma.transaction.findMany({
        select : {
            id : true,
            user : {
                select : {
                    id : true,
                    username : true
                }
            },
            status : true,
            phone : true,
            address : true,
            note : true,
            total : true,
            typeOfTransaction : true,
            transactionItems : {
                select : {
                    foodId : true,
                    quantity : true,
                    itemNote : true,
                    food : {
                        select : {
                            title : true,
                            price : true,
                            imageUrl : true
                        }

                    }
                }
            }
        }
    });
    return transactions;
}
export const getTotalPriceToday = async () => {
    const todayTransactions = await prisma.transaction.findMany({
        where : {
            createdAt : {
                gte : new Date(new Date().setHours(0,0,0,0))
            }
        },
        select : {
            total : true
        }
    });
    let totalPrice = 0;
    // for (let i = 0; i < todayTransactions.length; i++){
    //     totalPrice += parseInt(todayTransactions[i].total);
    // }
    return totalPrice;
}
export const getTransactionByUserId = async (userId : string) => {
    const foundTransactions = await prisma.transaction.findMany({
        where : {
            userId : userId
        },
        select : {
            id : true,
            user : {
                select : {
                    id : true,
                    username : true
                }
            },
            status : true,
            phone : true,
            address : true,
            note : true,
            total : true,
            typeOfTransaction : true,
            transactionItems : {
                select : {
                    foodId : true,
                    quantity : true,
                    itemNote : true,
                    food : {
                        select : {
                            title : true,
                            price : true,
                            imageUrl : true
                        }

                    }
                }
            }
        }
    });
    return foundTransactions;
}

export const updateTransactionStatus = async (transactionId : string, status : string) => {
    const updatedTransaction = await prisma.transaction.update({
        where : {
            id : transactionId
        },
        data : {
            status : status
        },
        select : {
            id : true,
            user : {
                select : {
                    id : true,
                    username : true
                }
            },
            status : true,
            phone : true,
            address : true,
            note : true,
            total : true,
            typeOfTransaction : true,
            transactionItems : {
                select : {
                    foodId : true,
                    quantity : true,
                    itemNote : true,
                    food : {
                        select : {
                            title : true,
                            price : true,
                            imageUrl : true
                        }

                    }
                }
            }
        }
    });
    return updatedTransaction;
}
