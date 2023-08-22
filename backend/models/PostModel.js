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

const PostModel = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [0, 5000] // Ensure the length is between 0 and 5000 characters
        }
    },
    file: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postedby: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
// Sync models with database and start the server
// sequelize.sync({ alter: true })  This will create the table if it doesn't exist and if exists then delete the old one and then create
sequelize.sync({ force: false }) // This will create the table if it doesn't exist and if exists then delete the old one and then create hance we use false in place of true so make it ture for the first run and then turn to false
    .then(() => {
        console.log('\n\nPosts Tables synchronized\n\n');
    })
    .catch(error => {
        console.error('\nError synchronizing tables:', error, "\n\n");
    });
export default PostModel