import { DataTypes, Model } from 'sequelize';
import { connection } from '../database/connection.js';
class Cart extends Model {
    id;
    menu_id;
    user_id;
    count;
}
Cart.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    menu_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    sequelize: connection, createdAt: "created_at", tableName: "cart"
});
export default Cart;
