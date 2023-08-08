import { DataTypes, Model } from 'sequelize';
import { connection } from '../database/connection.js';
class Payment extends Model {
    id;
    cart_id;
    created_at;
    user_id;
}
Payment.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    cart_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    sequelize: connection, createdAt: "created_at", tableName: "payment"
});
export default Payment;
