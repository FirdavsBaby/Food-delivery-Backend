import Purchase from "../models/Purchase.model.js"
import User from "../models/User.model.js"







const relations = () => {
    User.hasOne(Purchase, {
        foreignKey: {
            name: "user_id",
            allowNull: false,
        },
        as: "user"
    })
    Purchase.belongsTo(User, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        },
        as: "user"
    })
    User.hasOne(Purchase, {
        foreignKey: {
            name: "restoran_id",
            allowNull: false
        },
        as: "restoran"
    }),
    Purchase.belongsTo(User, {
        foreignKey: {
            name: "restoran_id",
            allowNull: false
        },
        as: "restoran"
    })
    User.hasOne(Purchase, {
        foreignKey: {
            name: "courier_id",
        },
        as: "courier"
    }),
    Purchase.belongsTo(User, {
        foreignKey: {
            name: "courier_id",
        },
        as: "courier"
    })
}


export default relations