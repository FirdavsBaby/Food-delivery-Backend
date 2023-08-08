import User from "../models/User.model.js";
import { CustomError } from "../utils/CustomError.js";
export const currentUser = async (req, res, next) => {
    try {
        const { id } = req.verify;
        const user = await User.findByPk(id);
        if (!user)
            throw new CustomError("User not found", 400);
        req.user = user?.dataValues;
        next();
    }
    catch (error) {
        next(error);
    }
};
