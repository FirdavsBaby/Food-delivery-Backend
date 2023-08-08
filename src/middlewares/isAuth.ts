import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError.js";
import jwt from 'jsonwebtoken'
import cfg from "../config/cfg.js";
import { AuthRequest } from "../types/Auth.type.js";
import { verifyData } from "../types/Verify.type.js";


export const isAuth = async(req:AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
        if (!token) throw new CustomError("Unauthorizied", 401)
        if (!cfg.secret_key) throw new CustomError("Secret key missing",500)
        jwt.verify(token, cfg.secret_key, (err, data): void => {
           if (err) {
            if (err instanceof jwt.TokenExpiredError) {
                throw new CustomError("Expired Token", 400) 
              } else if (err instanceof jwt.JsonWebTokenError) {
                throw new CustomError("Invalid Token", 400)
              }
           }
           req.verify = data as verifyData
           next()
        })
    } catch (error) {
        next(error)
    }
}