import Cart from "../models/Cart.model.js";
import Payment from "../models/Payment.model.js";
import User from "../models/User.model.js";
const relations = () => {
    Cart.hasMany(Payment, {
        foreignKey: {
            name: "cart_id",
            allowNull: false
        }
    }),
        Payment.belongsTo(Cart, {
            foreignKey: {
                name: "cart_id",
                allowNull: false
            }
        });
    User.hasOne(Payment, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    });
    Payment.belongsTo(User, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    });
};
export default relations;
