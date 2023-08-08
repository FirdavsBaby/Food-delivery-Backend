import Menu from "../models/Menu.model.js"
import Cart from "../models/Cart.model.js"
import User from "../models/User.model.js"



const relations = () => {
    User.hasMany(Cart, {
        foreignKey: {
            name:"user_id",
            allowNull: false
        }
    }),
    Cart.belongsTo(User, {
        foreignKey: {
            name: "user_id",
            allowNull: false
        }
    })
    Menu.hasMany(Cart, {
        foreignKey: {
            name:"menu_id",
            allowNull: false
        }
    }),
    Cart.belongsTo(Menu, {
        foreignKey: {
            name: "menu_id",
            allowNull: false
        }
    })

}


export default relations