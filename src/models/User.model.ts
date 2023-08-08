import {DataTypes, Model} from 'sequelize'
import {connection} from '../database/connection.js'

class User extends Model {
    id!: string;
    username!: string;
    password!: string;
    email!: string;
    role!: "user" | "admin" | "courier" | "restoran" | "super_admin";
    created_at!: Date;
    isVerified!: boolean;
    location!: string;
    balance!: number
}

User.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize: connection, createdAt: "created_at", tableName: "users"
})

export default User