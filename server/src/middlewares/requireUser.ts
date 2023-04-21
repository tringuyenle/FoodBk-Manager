/**
 * check if user is logged in with a valid token and specified role
 * @param req
 * @param res
 * @param next
 * @returns next()
 * @returns res.status(401).json({message: "Unauthorized"})
 */
import { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"


export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized")
    }
    return next();
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized")
    }
    if (res.locals.user.role === 'admin') {
        return next();
    }
    return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized")
}