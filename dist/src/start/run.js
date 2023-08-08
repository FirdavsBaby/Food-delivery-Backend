import cfg from "../config/cfg.js";
import { connection } from "../database/connection.js";
import User from "../models/User.model.js";
import { v4 } from "uuid";
import bcrypt from 'bcrypt';
import RM from "../relations/restoran-menu.js";
import CMU from "../relations/cart-menu.js";
import PU from "../relations/purchase-user.js";
import RP from "../relations/rate-purchase.js";
export const run = async (app) => {
    await connection.authenticate({
        logging: false
    });
    RM();
    CMU();
    PU();
    RP();
    await connection.sync({
        logging: false,
        force: false,
        alter: true
    });
    const checkAdmin = await User.findOne({ where: { role: 'super_admin' } });
    if (!checkAdmin) {
        if (!cfg.admin_password || !cfg.admin_email || !cfg.admin_username)
            return console.log("Please enter admin data to .env");
        const hashPassword = await bcrypt.hash(cfg.admin_password, 12);
        await User.create({ id: v4(), email: cfg.email, password: hashPassword, role: 'super_admin', isVerified: true, username: cfg.admin_username, location: "secret" });
    }
    console.log("Connection to DB successful...");
    app.listen(cfg.port, () => {
        console.log(cfg.port);
    });
};
