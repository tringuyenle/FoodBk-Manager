import {deleteUploadedFoodSchema, uploadFoodSchema } from './uploadFood.schema';
import express from 'express'
import { deleteUploadedFoodController, getUploadedFoodController, uploadFoodController, searchUploadedFoodController } from './uploadFood.controller'
import multer from 'multer'
import { storage } from '../../cloudinary/cloudinary';
import { processRequestBody, processRequestParams } from 'zod-express-middleware'
import catchAsync from '../../utils/catchAsync';
import { requireAdmin } from '../../middlewares/requireUser';
const upload = multer({ storage })
const uploadFoodRouter = express.Router()

uploadFoodRouter.post('/uploadFood',requireAdmin,upload.single('image'),processRequestBody(uploadFoodSchema),catchAsync(uploadFoodController))
uploadFoodRouter.get('/',catchAsync(getUploadedFoodController))
uploadFoodRouter.get('/:name',catchAsync(searchUploadedFoodController))
uploadFoodRouter.delete('/:uploadFoodId',requireAdmin,processRequestParams(deleteUploadedFoodSchema),catchAsync(deleteUploadedFoodController))
export default uploadFoodRouter