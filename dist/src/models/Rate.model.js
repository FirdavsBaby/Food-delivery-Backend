import { DataTypes, Model } from 'sequelize';
import { connection } from '../database/connection.js';
class Rate extends Model {
    id;
    purchase_id;
    raiting;
}
Rate.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    purchase_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    raiting: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: connection, createdAt: "created_at", tableName: "ratings"
});
export default Rate;
