import { NextFunction, Response } from "express";
import { AuthRequest } from "../../types/Auth.type.js";
import { UserT } from "../../types/User.type.js";
import Joi from "joi";
import { CustomError } from "../../utils/CustomError.js";
import User from "../../models/User.model.js";
import bcrypt from 'bcrypt'
import Purchase from "../../models/Purchase.model.js";

export const newAdmin = async(req:AuthRequest,res:Response,next:NextFunction): Promise<void> => {
    try {
        const {username, password, email} = req.body as UserT

        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required().email(),
        })
        const {error} = schema.validate({username, password, email})
        if (error) throw new CustomError(error.message, 400)
        const hashPassword = await bcrypt.hash(password, 12)
        await User.create({username, password: hashPassword, email, role: "admin", location: "secret", isVerified: true})
        res.status(201).json({message: "Admin created successfully"})
    } catch (error) {
        next(error)
    }
}

export const getAllUser = async(req:AuthRequest, res:Response, next:NextFunction): Promise<void> => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req:AuthRequest, res:Response, next:NextFunction): Promise<void> => {
    try {
        const {id} = req.params
        const user = await User.findByPk(id)
        if (!user) throw new CustomError("User not found", 400)
        await user.destroy()
        res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        next(error)
    }
}


export const getStats = async(req:AuthRequest, res:Response, next:NextFunction): Promise<void> => {
    try {
        const {status, time, restoran_id} = req.query
        let purchase: Purchase[] = []

        if (status) {
             purchase = await Purchase.findAll({where: {status}, include: [{
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
        ]})
        }else if (time) {
            purchase = await Purchase.findAll({where: {created_at: time}, include: [{
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
        ]})
        }else if (restoran_id) {
            purchase = await Purchase.findAll({where: {restoran_id}, include: [{
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
        ]})
        }else {
            purchase = await Purchase.findAll({include: [{
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
        ]})
        }
        res.status(200).json(purchase)
        
    } catch (error) {
        next(error)
    }
}