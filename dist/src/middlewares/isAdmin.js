import { CustomError } from "../utils/CustomError.js";
export const isAdmin = (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== "admin" && role !== "super_admin")
            throw new CustomError("You are not admin", 400);
        next();
    }
    catch (error) {
        next(error);
    }
};
