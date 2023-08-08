import Menu from "../models/Menu.model.js";
import User from "../models/User.model.js";
const relations = () => {
    User.hasMany(Menu, {
        foreignKey: {
            name: "restoran_id",
            allowNull: false
        }
    });
    Menu.belongsTo(User, {
        foreignKey: {
            name: "restoran_id",
            allowNull: false
        }
    });
};
export default relations;
