import {DataTypes, Model} from 'sequelize'
import {connection} from '../database/connection.js'

class Purchase extends Model {
    id!: string
    user_id!: string
    status!: "waiting restoran" |  "denied"  | "waiting courier" | "at the courier" | "delivered"
    restoran_id!: string 
    courier_id!: string
}

Purchase.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    restoran_id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    courier_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "waiting restoran"
    }
}, {
    sequelize: connection, createdAt: "created_at", tableName: "purchase"
})

export default Purchase