import { CustomError } from "../utils/CustomError.js";
export const isSuper_admin = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== "super_admin")
            throw new CustomError("You are not super_admin", 400);
        next();
    }
    catch (error) {
        next(error);
    }
};
