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
const port = process.env.PORT2
// Sync models with database and start the server
sequelize.sync({ force: true }) // This will create the table if it doesn't exist
    .then(() => {
        console.log('Tables synchronized');
        app.listen(port, () => {
            console.log(`\n\nRunning Backend Side at http://localhost:${port}\n\nWithout any Error`);
        });
    })
    .catch(error => {
        console.error('Error synchronizing tables:', error);
    });
export default UserModel