/**
 * index.ts file created on 2022-10-29
 * WELCOME TO index.ts
 */

/**
 * Required External Modules
 */
import cors, { CorsOptions } from "cors";
import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import deserializeUser from "./middlewares/deserializeUser";
import transactionRouter from "./modules/Transaction/transaction.route";
//import transactionRouter from "./modules/Transaction/transaction.route";
import uploadFoodRouter from "./modules/uploadFood.ts/uploadFood.route";
import userRouter from "./modules/user/user.route";
import ExpressError from "./utils/expressError";
import log from "./utils/logger";
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
/**
 * App Variables
 */
const app = express();
//const port = process.env.PORT || 3000;
const port = 3001;
const corsOptions: CorsOptions = {
    credentials: true,
    origin: true,
}
/**
 *  Middlewares
 */
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser)
/**
 * Routes Definitions
*/
app.use('/api/users',userRouter)
app.use('/api/uploadFoods',uploadFoodRouter)
app.use('/api/transactions', transactionRouter)
/**
 * Health Check, Error Handling, and Running the Server
*/
app.get('/healthcheck', (req: Request, res: Response) => {
    res.status(StatusCodes.OK).send('ok');
})
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    return next(new ExpressError('Not Found', StatusCodes.NOT_FOUND))
})
app.use((err: ExpressError, req: Request, res: Response) => {
    const { status = StatusCodes.INTERNAL_SERVER_ERROR, message = 'Something went wrong' } = err
    res.status(status).send(message)
})
app.listen(port, () => {
    log.info(`Server is listening on port ${port}`)
})