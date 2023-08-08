import Purchase from "../models/Purchase.model.js";
import Rate from "../models/Rate.model.js";
const relations = () => {
    Purchase.hasOne(Rate, {
        foreignKey: {
            name: "purchase_id",
            allowNull: false
        }
    });
    Rate.belongsTo(Purchase, {
        foreignKey: {
            name: "purchase_id",
            allowNull: false
        }
    });
};
export default relations;
