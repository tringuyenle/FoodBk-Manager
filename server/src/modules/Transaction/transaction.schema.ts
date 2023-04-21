import {z} from 'zod'

export const TransactionItemSchema = z.object({
    foodId : z.string({
        required_error: 'FoodId is required'
    }),
    quantity : z.string({
        required_error: 'Quantity is required'
    }),
    itemNote : z.string({
        required_error: 'Note is required'
    })
})

export const TransactionSchema = z.object({
    transactionItem : z.array(TransactionItemSchema),
    typeOfTransaction : z.string({
        required_error: 'TransactionType is required'
    }),
    status: z.string({
        required_error: 'TransactionStatus is required'
    }),
    phone: z.string({
        required_error: 'TransactionPhone is required'
    }),
    address : z.string({
        required_error: 'TransactionAddress is required'
    }),
    note: z.string({
        required_error: 'TransactionNote is required'
    }),
    total : z.string({
        required_error: 'TransactionTotal is required'
    })
})


export type TransactionInfo = z.infer<typeof TransactionSchema>;
export type TransactionItemInfo = z.infer<typeof TransactionItemSchema>;