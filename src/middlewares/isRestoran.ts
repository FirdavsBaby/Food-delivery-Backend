import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/Auth.type.js";
import { UserT } from "../types/User.type.js";
import { CustomError } from "../utils/CustomError.js";



export const isRestoran = (req:AuthRequest,res:Response,next:NextFunction) => {
        try {
        const {role} = req.user as UserT
        if (role !== "restoran") throw new CustomError("You are not restoran user", 400)
        next()
        } catch (error) {
            next(error)
        }
}