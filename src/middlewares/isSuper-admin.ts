import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/Auth.type.js";
import { UserT } from "../types/User.type.js";
import { CustomError } from "../utils/CustomError.js";

export const isSuper_admin = (req:AuthRequest,res:Response,next:NextFunction):void => {
    try {
        const {role} = req.user as UserT
        if (role !== "super_admin") throw new CustomError("You are not super_admin", 400)
        next()
    } catch (error) {
        next(error)
    }
}