import { CustomError } from "../utils/CustomError.js";
export const isCourier = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== "courier")
            throw new CustomError("You are not courier user", 400);
        next();
    }
    catch (error) {
        next(error);
    }
};
