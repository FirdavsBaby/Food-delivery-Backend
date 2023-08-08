import { CustomError } from "../utils/CustomError.js";
export const isRestoran = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== "restoran")
            throw new CustomError("You are not restoran user", 400);
        next();
    }
    catch (error) {
        next(error);
    }
};
