import Cart from "../../models/Cart.model.js";
import { CustomError } from "../../utils/CustomError.js";
import Menu from "../../models/Menu.model.js";
import Stripe from "stripe";
import cfg from "../../config/cfg.js";
import User from "../../models/User.model.js";
import Purchase from "../../models/Purchase.model.js";
import Joi from "joi";
import Rate from "../../models/Rate.model.js";
if (!cfg.payment_key)
    throw new CustomError("Type 'payment_key'", 400);
let stripe = new Stripe(cfg.payment_key, {
    apiVersion: "2022-11-15"
});
export const getCart = async (req, res, next) => {
    try {
        const { id } = req.user;
        const cart = await Cart.findAll({ where: { user_id: id }, include: {
                model: Menu,
            } });
        let price = 0;
        for (let i = 0; i < cart.length; i++) {
            price += cart[i].dataValues.count * cart[i].dataValues.Menu.dataValues.price;
        }
        res.status(200).json({ cart, general_price: price });
    }
    catch (error) {
        next(error);
    }
};
export const MinusCount = async (req, res, next) => {
    try {
        const { id: user_id } = req.user;
        const { id: menu_id } = req.params;
        const findItem = await Cart.findOne({ where: { menu_id, user_id } });
        if (!findItem)
            throw new CustomError("Item not found", 400);
        await findItem.update({ count: findItem.dataValues.count - 1 });
        res.status(200).json({ message: "Count updated" });
    }
    catch (error) {
        next(error);
    }
};
export const AddToCart = async (req, res, next) => {
    try {
        const { id: user_id } = req.user;
        const { id: menu_id } = req.params;
        const findItem = await Cart.findOne({ where: { menu_id, user_id } });
        if (findItem) {
            const { count } = findItem.dataValues;
            findItem.update({ count: count + 1 });
            res.status(200).json({ message: "Cart item updated successfully" });
        }
        else {
            await Cart.create({ user_id, menu_id });
            res.status(201).json({ message: "Cart item created successfully" });
        }
    }
    catch (error) {
        next(error);
    }
};
export const RemoveFromCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findItem = await Cart.findByPk(id);
        if (!findItem)
            throw new CustomError("Cart item is not found", 400);
        await findItem.destroy();
        res.status(200).json({ message: "Cart item deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const newPayment = async (req, res, next) => {
    try {
        const { amount, id } = req.body;
        const { id: user_id } = req.user;
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Payment",
            payment_method: id,
            confirm: true
        });
        const user = await User.findByPk(user_id);
        const newBalance = user?.dataValues.balance + amount;
        await user?.update({ balance: newBalance });
        console.log("Payment", payment);
        res.status(201).json({
            message: "Payment was successful",
            success: true
        });
    }
    catch (error) {
        next(error);
    }
};
export const newPurchase = async (req, res, next) => {
    try {
        const { balance, id } = req.user;
        const cart = await Cart.findAll({ where: { user_id: id }, attributes: ["id", "count"], include: {
                model: Menu,
                attributes: ["price", "restoran_id"]
            } });
        for (let i = 0; i < cart.length; i++) {
            let price = 0;
            let restoran = await User.findByPk(cart[i].dataValues.Menu.dataValues.restoran_id);
            price += cart[i].dataValues.count * cart[i].dataValues.Menu.dataValues.price;
            if (price === 0)
                throw new CustomError("Not items in cart", 400);
            if (price > balance)
                throw new CustomError("Balnace is very low", 400);
            await Purchase.create({ user_id: id, restoran_id: cart[i].dataValues.Menu.dataValues.restoran_id });
            await restoran?.update({ balance: restoran?.dataValues.balance + price });
            let newBalance = balance - price;
            const user = await User.findByPk(id);
            await Cart.destroy({ where: { user_id: id } });
            await user?.update({ balance: newBalance });
        }
        res.status(201).json({ message: "New purchase added successfuly. Please wait confirmation of restoran" });
    }
    catch (error) {
        next(error);
    }
};
export const AllPurchases = async (req, res, next) => {
    try {
        const { role } = req.user;
        if (role !== "admin" && role !== "restoran")
            throw new CustomError("You have not permission to purchase", 400);
        const purchases = await Purchase.findAll({ include: [{
                    model: User
                }] });
        res.status(200).json(purchases);
    }
    catch (error) {
        next(error);
    }
};
export const QueuePurchase = async (req, res, next) => {
    try {
        const purchases = await Purchase.findAll({ where: { status: "waiting restoran" }, include: [{
                    model: User
                }] });
        res.status(200).json(purchases);
    }
    catch (error) {
        next(error);
    }
};
export const MyPurchase = async (req, res, next) => {
    try {
        const { id } = req.user;
        const purchase = await Purchase.findAll({ where: { user_id: id }, include: [{
                    model: User,
                    isAliased: true,
                    as: "restoran",
                    attributes: ["username", "location"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["username", "location"],
                },
                {
                    model: User,
                    as: "courier",
                    attributes: ["username"],
                }] });
        res.status(200).json(purchase);
    }
    catch (error) {
        next(error);
    }
};
export const confirmation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (status !== "accepted" && status !== "denied")
            throw new CustomError("please select one of the statuses accepted or denied", 400);
        const findPurchase = await Purchase.findByPk(id);
        if (!findPurchase)
            throw new CustomError("Purchase not found", 400);
        await findPurchase.update({ status: status === "accepted" ? "waiting courier" : "denied" });
        res.status(200).json({ message: "Confirmation successful" });
    }
    catch (error) {
        next(error);
    }
};
export const raiting = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rate } = req.body;
        const schema = Joi.number().required().min(1).max(5);
        const { error } = schema.validate(rate);
        if (error)
            throw new CustomError("Rate can be from 1 to 5 and rate is required", 400);
        const purchase = await Purchase.findByPk(id);
        if (!purchase)
            throw new CustomError("Puchase not found", 400);
        const findRate = await Rate.findOne({ where: { purchase_id: id } });
        if (findRate)
            throw new CustomError("This purchase is already raited", 400);
        await Rate.create({ purchase_id: id, raiting: rate });
        res.status(201).json({ message: "Rate created successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const getMe = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        next(error);
    }
};
export const PurchasesHistory = async (req, res, next) => {
    try {
        const { id } = req.user;
        const purchase = await Purchase.findAll({ where: { user_id: id, status: "delivered" || "denied" }, include: [{
                    model: User,
                    isAliased: true,
                    as: "restoran",
                    attributes: ["username", "location"]
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["username", "location"],
                },
                {
                    model: User,
                    as: "courier",
                    attributes: ["username"],
                }] });
        res.status(200).json(purchase);
    }
    catch (error) {
        next(error);
    }
};
