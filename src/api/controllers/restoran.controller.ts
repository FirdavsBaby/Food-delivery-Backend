import { NextFunction, Response } from "express"
import { AuthRequest } from "../../types/Auth.type.js"
import geoip from 'geoip-lite'
import { UserT, location } from "../../types/User.type.js"
import Joi from "joi"
import { CustomError } from "../../utils/CustomError.js"
import User from "../../models/User.model.js"
import { v4 } from 'uuid';
import bcrypt from 'bcrypt'
import Menu from "../../models/Menu.model.js"
import { getRestorans } from "../../utils/getRestorans.js"

export const getQueue = async(req:AuthRequest,res:Response,next:NextFunction):Promise<void> => {
    try {   
        const restorans: User[] = await User.findAll({where: {role: "restoran", isVerified: false}})
        res.status(200).json(restorans)
    } catch (error) {
        next(error)
    }
}

export const ConfirmRestoran = async(req:AuthRequest,res:Response, next:NextFunction): Promise<void> => {
    try {
        const {id} = req.params
        const checkRestoran = await User.findByPk(id)
        if (!checkRestoran) throw new CustomError("Restoran not found", 400)
        checkRestoran.update({isVerified: true})
        res.status(200).json({message: "Restoran confirmed successfully"})
    } catch (error) {
        next(error)
    }
}

export const getAllRestorans = async(req:AuthRequest, res:Response, next:NextFunction): Promise<void> => {
    try {
        const {location} = req.user as UserT
        const objLocation: location = {
            latitude: +location.split(" ")[1],
            longitude: +location.split(" ")[3]
        }
        const restorans: User[] = await User.findAll({where: {role: "restoran", isVerified: true}})
        
        const checkRestorans: UserT[] = getRestorans(restorans, objLocation.latitude, objLocation.longitude) 
        res.status(200).json(checkRestorans)
    } catch (error) {
        next(error)
    }
}

export const getOneRestoran = async(req:AuthRequest, res:Response, next:NextFunction): Promise<void> => {
    try {
        const {id} = req.params
        const restoran = await User.findOne({
            where: {id},
            include: [{
                model: Menu
            }]
        })
        if (!restoran) throw new CustomError("Restoran not found", 400)
        res.status(200).json(restoran)
    } catch (error) {
        next(error)
    }
}


