import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/Auth.type.js";
import { verifyData } from "../types/Verify.type.js";
import User from "../models/User.model.js";
import { CustomError } from "../utils/CustomError.js";
import { UserT } from "../types/User.type.js";




export const currentUser = async(req: AuthRequest, res: Response, next: NextFunction):Promise<void> => {
   try {
    const {id} = req.verify as verifyData
    const user = await User.findByPk(id);
    if (!user) throw new CustomError("User not found", 400)
    req.user = user?.dataValues as UserT
    next()
   } catch (error) {
    next(error)
   }
}