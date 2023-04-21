import { deleteUploadedFoodParam, UploadFoodInput } from './uploadFood.schema';
import { NextFunction, Request, Response } from "express";
import ExpressError from '../../utils/expressError';
import { StatusCodes } from 'http-status-codes';
import { deleteUploadedFoodService, getAllFoodsService, uploadFoodService, searchFoodsServiceName } from './uploadFood.service';
export const uploadFoodController = async (req: Request<{},{},UploadFoodInput>, res: Response, next : NextFunction) => {
    if(!req.file) {
        return next(new ExpressError('Image is required',StatusCodes.BAD_REQUEST))
    }
    const {path,filename} = req.file;
    const newFood = await uploadFoodService(req.body,path,filename);
    if(!newFood) {
        return next(new ExpressError('Food already exists',StatusCodes.BAD_REQUEST))
    }
    res.status(StatusCodes.CREATED).send(newFood);  
}

export const getUploadedFoodController = async (req: Request, res: Response) => {
    const foods = await getAllFoodsService();
    res.status(StatusCodes.OK).send(foods);
}
export const deleteUploadedFoodController = async (req: Request<deleteUploadedFoodParam,{},{}>, res: Response) => {
    const {uploadFoodId} = req.params;
    const deletedFood = await deleteUploadedFoodService(uploadFoodId);
    if(!deletedFood) {
        return res.status(StatusCodes.NOT_FOUND).send("Food not found");
    }
    res.status(StatusCodes.OK).send("Food deleted successfully");
}

export const searchUploadedFoodController = async (req: Request, res: Response) => {
    const {name} = req.params;
    const foods = await searchFoodsServiceName(name);
    res.status(StatusCodes.OK).send(foods);
    
}