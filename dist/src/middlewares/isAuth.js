import { CustomError } from "../utils/CustomError.js";
import jwt from 'jsonwebtoken';
import cfg from "../config/cfg.js";
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
        if (!token)
            throw new CustomError("Unauthorizied", 401);
        if (!cfg.secret_key)
            throw new CustomError("Secret key missing", 500);
        jwt.verify(token, cfg.secret_key, (err, data) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    throw new CustomError("Expired Token", 400);
                }
                else if (err instanceof jwt.JsonWebTokenError) {
                    throw new CustomError("Invalid Token", 400);
                }
            }
            req.verify = data;
            next();
        });
    }
    catch (error) {
        next(error);
    }
};
