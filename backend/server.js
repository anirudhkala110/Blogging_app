import express from "express";
import mysql from 'mysql2'
import cors from 'cors'
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer"
import path from "path"
import bodyParser from "body-parser"
import doenv from 'dotenv'
import UserModel from './models/UserModel.js';


const app = express()
app.use(cors({
    origin: ["http://localhost:5173/"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

doenv.config()
app.use(cookieParser())

const db = mysql.createConnection({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASS,
})

const port = process.env.PORT

/* Registration API  */
app.get('/', (req, res) => {
    const creatingTable = "CREATE TABLE `userlogin` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(255) NOT NULL,`email` VARCHAR(255) NOT NULL,`password` VARCHAR(255) NOT NULL,`phone` BIGINT(12) NOT NULL,PRIMARY KEY (`id`),UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE);"
    db.query(creatingTable, (err, res) => {
        if (err) {
            console.log("Table Already Exists : userlogin")
            const sql = 'SELECT * from userlogin'
            db.query(sql, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                }
            })
        }
        else {
            console.log("Table Created Named as : userlogin")
        }
    })
})

app.post('/register', (req, res) => {
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.json(err))

})

/* Registration API  Completed*/


app.listen(port, () => {
    console.log("Running Backend Side at ", `${port}`)
})