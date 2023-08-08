import {DataTypes, Model} from 'sequelize'
import {connection} from '../database/connection.js'

class Menu extends Model {
    id!: string
    restoran_id!: string
    title!: string
    price!: number
    description!: string
    photo!: string
}

Menu.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    restoran_id: {
        allowNull: false,
        type: DataTypes.UUID,
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    photo: {
        allowNull: false,
        type: DataTypes.STRING
    }
}, {
    sequelize: connection, createdAt: "created_at", tableName: "menu"
})

export default Menu