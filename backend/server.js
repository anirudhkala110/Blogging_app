import express from "express";
import mysql from 'mysql2'
import cors from 'cors'
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import bodyParser from "body-parser";
import doenv from 'dotenv'

const app = express()
app.use(cors({
    origin: ["http://localhost:5173/"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.use(cookieParser())

app.listen(8093, () => {
    console.log("Running Backend Side")
})