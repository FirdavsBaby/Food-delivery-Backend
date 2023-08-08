import { CustomError } from "../utils/CustomError.js";
export const isUser = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== "user")
            throw new CustomError("You are not user", 400);
        next();
    }
    catch (error) {
        next(error);
    }
};
