import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError.js";


export const errorHandler = async(error: CustomError, req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(error.code || 500).json({error: error.message})
}