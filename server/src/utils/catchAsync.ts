/**
 * Catch errors in async functions and pass them to the error handler middleware
 * @param fn
 * @returns {function(...[*]=)}
 */
import { Request, Response, NextFunction } from "express";

export default function catchAsync(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((e: any) => next(e));
    };
}