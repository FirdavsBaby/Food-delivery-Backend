import { Sequelize } from 'sequelize';
import config from '../config/cfg.js';
import { CustomError } from '../utils/CustomError.js';
if (!config.connection_string)
    throw new CustomError("Connection string is required", 500);
export const connection = new Sequelize(config.connection_string);
