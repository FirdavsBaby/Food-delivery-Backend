import express from "express";
import cors from 'cors';
import { errorHandler } from "../middlewares/error-handler.js";
import router from '../api/routes/index.js';
import fileUpload from 'express-fileupload';
export const modules = (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload());
    app.use(express.static(process.cwd() + "/uploads"));
    app.use(router);
    app.use(errorHandler);
};
