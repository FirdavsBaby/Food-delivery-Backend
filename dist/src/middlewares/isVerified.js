import { CustomError } from "../utils/CustomError.js";
export const isVerified = async (req, res, next) => {
    try {
        const { isVerified } = req?.user;
        if (!isVerified)
            throw new CustomError("Email not verified", 400);
        next();
    }
    catch (error) {
        next(error);
    }
};
