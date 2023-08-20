// Import required modules
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

// Initialize Express app
const app = express();
app.use(cors({
    // ... cors configuration
}));
app.use(cookieParser());

// Load environment variables
dotenv.config();

// Set up Sequelize and define UserModel
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS
});

const UserModel = sequelize.define('userlogin', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    }
});
// Sync models with database and start the server
sequelize.sync({ alter: true }) // This will create the table if it doesn't exist and if exists then delete the old one and then create
    // sequelize.sync({ force: true })  This will create the table if it doesn't exist and if exists then delete the old one and then create
    .then(() => {
        console.log('\n\nTables synchronized\n\n');
    })
    .catch(error => {
        console.error('\nError synchronizing tables:', error, "\n\n");
    });
export default UserModel