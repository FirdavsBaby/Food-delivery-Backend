import Joi from "joi";
import { CustomError } from "../../utils/CustomError.js";
import Menu from "../../models/Menu.model.js";
import { v4 } from "uuid";
import path from 'path';
import User from "../../models/User.model.js";
export const newMenuItem = async (req, res, next) => {
    try {
        const { id: user_id } = req.user;
        const { title, description, price } = req.body;
        if (!req.files)
            throw new CustomError("image is required", 400);
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required()
        });
        const { error } = schema.validate({ title, description, price });
        if (error)
            throw new CustomError(error.message, 400);
        const menu = await Menu.findOne({ where: {
                restoran_id: user_id,
                title
            } });
        if (menu)
            throw new CustomError("This item in menu already exist", 400);
        const { mv, name } = req.files?.image;
        let imageName = `${v4()}${path.extname(name)}`;
        await Menu.create({ title, description, price, restoran_id: user_id, photo: imageName });
        mv(`${process.cwd()}/uploads/${imageName}`);
        res.status(201).json({ message: "Menu item created successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const updateMenu = async (req, res, next) => {
    try {
        const { id: user_id } = req.user;
        const { id } = req.params;
        const { title, description, price } = req.body;
        if (!title && !description && !price && !req.files)
            throw new CustomError("Nothing to update", 400);
        const menuItem = await Menu.findByPk(id);
        if (!menuItem)
            throw new CustomError("Menu item not found", 400);
        let { photo, restoran_id } = menuItem?.dataValues;
        if (restoran_id !== user_id)
            throw new CustomError("It is not your menu item", 400);
        let imageName = null;
        if (req.files?.image) {
            const { mv, name } = req.files?.image;
            imageName = `${v4()}${path.extname(name)}`;
            mv(`${process.cwd()}/uploads/${imageName}`);
        }
        await menuItem.update({ title, description, price, photo: imageName ? imageName : photo });
        res.status(200).json({ message: "Menu item updated successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const getAllMenu = async (req, res, next) => {
    try {
        const menu = await Menu.findAll({ include: [{
                    model: User
                }] });
        res.status(200).json(menu);
    }
    catch (error) {
        next(error);
    }
};
export const getRestoranMenu = async (req, res, next) => {
    try {
        const { id } = req.user;
        const menu = await Menu.findAll({ where: { restoran_id: id }, include: [{
                    model: User
                }] });
        res.status(200).json(menu);
    }
    catch (error) {
        next(error);
    }
};
export const getOneMenu = async (req, res, next) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findByPk(id, { include: [{
                    model: User
                }] });
        res.status(200).json(menu);
    }
    catch (error) {
        next(error);
    }
};
export const deleteMenu = async (req, res, next) => {
    try {
        const { id: user_id } = req.user;
        const { id } = req.params;
        console.log(id);
        const menuItem = await Menu.findByPk(id);
        if (!menuItem)
            throw new CustomError("Menu item not found", 400);
        let { restoran_id } = menuItem?.dataValues;
        if (restoran_id !== user_id)
            throw new CustomError("It is not your menu item", 400);
        await menuItem.destroy();
        res.status(200).json({ message: "Menu item deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
