import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/Auth.type.js";
import { CustomError } from "../utils/CustomError.js";
import { UserT } from "../types/User.type.js";


export const isVerified = async(req: AuthRequest,res: Response,next: NextFunction): Promise<void> => {
    try {
    const {isVerified} =  req?.user as UserT
    if (!isVerified) throw new CustomError("Email not verified", 400)
    next()
    } catch (error) {
        next(error)
    }
}