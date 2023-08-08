import Purchase from "../../models/Purchase.model.js";
import { CustomError } from "../../utils/CustomError.js";
import User from "../../models/User.model.js";
export const QueuePurchase = async (req, res, next) => {
    try {
        const purchase = await Purchase.findAll({ where: { status: "waiting courier" }, include: [{
                    model: User,
                    isAliased: true,
                    as: "restoran",
                    attributes: ["username", "location"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["username", "location"],
                }
            ] });
        res.status(200).json(purchase);
    }
    catch (error) {
        next(error);
    }
};
export const confirmationPurchase = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: user_id } = req.user;
        const findPurchase = await Purchase.findOne({ where: { status: "waiting courier", id } });
        if (!findPurchase)
            throw new CustomError("Purchase not found", 400);
        await findPurchase.update({ status: "at the courier", courier_id: user_id });
        res.status(200).json({ message: "Purchase updated successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const PurchaseAtCourier = async (req, res, next) => {
    try {
        const purchase = await Purchase.findAll({ where: { status: "at the courier" }, include: [{
                    model: User
                }] });
        res.status(200).json(purchase);
    }
    catch (error) {
        next(error);
    }
};
export const EndPurchase = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: user_id } = req.user;
        const findPurchase = await Purchase.findOne({ where: { status: "at the courier", id, courier_id: user_id } });
        if (!findPurchase)
            throw new CustomError("Purchase not found", 400);
        await findPurchase.update({ status: "delivered" });
        res.status(200).json({ message: "Purchase delivered successfuly" });
    }
    catch (error) {
        next(error);
    }
};
export const History = async (req, res, next) => {
    try {
        const { id: user_id } = req.user;
        const purchase = await Purchase.findAll({ where: { status: "devilered", courier_id: user_id }, include: [{
                    model: User,
                    isAliased: true,
                    as: "restoran",
                    attributes: ["username", "location"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["username", "location"],
                }
            ] });
        res.status(200).json(purchase);
    }
    catch (error) {
        next(error);
    }
};
