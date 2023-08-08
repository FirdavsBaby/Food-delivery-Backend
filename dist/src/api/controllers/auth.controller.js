import Joi from 'joi';
import { CustomError } from "../../utils/CustomError.js";
import User from "../../models/User.model.js";
import jwt from 'jsonwebtoken';
import { codeGenerator } from "../../utils/code-generator.js";
import bcrypt from 'bcrypt';
import cfg from "../../config/cfg.js";
import sendMail from "../../services/mail.service.js";
export const Register = async (req, res, next) => {
    try {
        const { username, password, role, email, location } = req.body;
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
            role: Joi.string().valid('courier', 'user', 'restoran').required(),
            email: Joi.string().required().email(),
            location: Joi.object({
                latitude: Joi.number().required(),
                longitude: Joi.number().required()
            })
        });
        const { error } = schema.validate({ username, password, role, email, location: { latitude: location?.latitude, longitude: location?.longitude } });
        if (error)
            throw new CustomError(error.message, 400);
        const checkUser = await User.findOne({ where: { email } });
        if (checkUser)
            throw new CustomError("User with this email already exists", 400);
        const hashPassword = await bcrypt.hash(password, 12);
        if (!cfg.secret_key)
            throw new CustomError("Secret key must be provided", 500);
        const user = await User.create({ username, password: hashPassword, role, email, location: `latitude: ${location?.latitude} longitude: ${location?.longitude}` });
        const { id } = user.dataValues;
        let message = "Wait for admin confirmation";
        let token = jwt.sign({ id }, cfg.secret_key);
        if (role !== "restoran") {
            const code = codeGenerator();
            token = jwt.sign({ id, code }, cfg.secret_key);
            sendMail(email, `<h1>CODE ${code}</h1>`, "Verify your email");
            message = "Code sended to your email";
        }
        res.status(201).json({ message, token });
    }
    catch (error) {
        next(error);
    }
};
export const VerifyEmail = async (req, res, next) => {
    try {
        const { code } = req.body;
        const { code: verify_code } = req.verify;
        const { id } = req.user;
        const schema = Joi.object({
            code: Joi.string().length(6).required()
        });
        const { error } = schema.validate({ code });
        if (error)
            throw new CustomError(error.message, 400);
        if (+code !== verify_code)
            throw new CustomError("Code incorrect", 403);
        await User.update({ isVerified: true }, { where: { id } });
        res.status(200).json({ message: "Email verified successfully" });
    }
    catch (error) {
        next(error);
    }
};
export const Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const schema = Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
        });
        const { error } = schema.validate({ username, password });
        if (error)
            throw new CustomError(error.message, 400);
        const checkUser = await User.findOne({ where: { username } });
        if (!checkUser)
            throw new CustomError("Forbidden", 400);
        const { isVerified, id, password: user_pass, email, role } = checkUser.dataValues;
        const comparePassword = await bcrypt.compare(password, user_pass);
        if (!comparePassword)
            throw new CustomError("Forbidden", 400);
        if (!cfg.secret_key)
            throw new CustomError("Secret key must be provided", 500);
        let token = jwt.sign({ id }, cfg.secret_key);
        let message = "Login successful.";
        if (!isVerified) {
            if (role === "restoran")
                throw new CustomError("Your account has not been verified by the admin, please wait a moment", 400);
            const code = codeGenerator();
            sendMail(email, `<h1>CODE ${code}</h1>`, "Verify your email");
            token = jwt.sign({ id, code }, cfg.secret_key);
            message += "But your Email is not verified. Code resended to your email. Please verify your email";
        }
        res.status(200).json({ message, token });
    }
    catch (error) {
        next(error);
    }
};
