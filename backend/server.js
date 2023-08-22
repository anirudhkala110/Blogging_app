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
import PostModel from "./models/PostModel.js";
import bcrypt from 'bcryptjs'


const app = express()
app.use(cors({
    origin: ["http://localhost:3020"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

doenv.config()
app.use(cookieParser())
app.use(express.json())
// app.use(bodyParser.json({ extends: true }))

const db = mysql.createConnection({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASS,
})

const port = process.env.PORT || 8093

/* Registration API  */
app.get('/', (req, res) => {
    const creatingTable = "CREATE TABLE `userlogin` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(255) NOT NULL,`email` VARCHAR(255) NOT NULL,`password` VARCHAR(255) NOT NULL,`phone` BIGINT(12) NOT NULL,PRIMARY KEY (`id`),UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE);"
    db.query(creatingTable, (err, respond) => {
        if (err) {
            console.log("Table Already Exists : userlogin")
            const sql = 'SELECT * from userlogin'
            db.query(sql, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                    return res.send(data)
                }
            })
        }
        else {
            console.log("Table Created Named as : userlogin")
        }
    })
})

app.post('/register', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const cpassword = req.body.cpassword
    const phone = req.body.phone
    const email = req.body.email
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/;
    // console.log(req.body)
    if (!email.match(emailRegex)) {
        return res.json({ msg: "Invalid email format", msg_type: 'error' });
    }
    if (!password.match(passwordRegex)) {
        return res.json({ msg: "Password must have at least 1 capital letter, 1 small letter, 1 number, and 1 special character", msg_type: 'error' });
    }
    if (cpassword != password)
        return res.json({ msg: "Password didn't match", msg_type: "error" })
    if (password.length < 10)
        return res.json({ msg: "Password Length should be minimum 10", msg_type: "error" })
    if (phone.length != 10 && phone.length != 12) {
        return res.json({ msg: "Phone number should be of 10 digit or 12 digit", msg_type: "error" })
    }
    else {
        console.log("Checking Email")
        const chkEmail = "SELECT * from userlogin WHERE email=? OR phone=?"
        db.query(chkEmail, [email, phone], async (err, chkEmaildata) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(chkEmaildata.length)
                if (chkEmaildata.length > 0) {
                    console.log("Email Already Exists", chkEmaildata)
                    if (parseInt(phone) === parseInt(chkEmaildata[0].phone) && email === chkEmaildata[0].email) {
                        return res.json({ msg: "Email and Phone Number Already in use . . Try another one", msg_type: "error" })
                    }
                    else if (email === chkEmaildata[0].email) {
                        return res.json({ msg: "Email already register. . Try Another One", msg_type: "error" })
                    }
                    else if (parseInt(phone) === chkEmaildata[0].phone) {
                        return res.json({ msg: "Phone already register. . Try Another One", msg_type: "error" })
                    }
                }
                else {
                    // bcrypt.hash(password, 20)
                    //     .then(hash => {
                    //         console.log("Inside Bcrypt UserModel")
                    //         UserModel.create({
                    //             name: username,
                    //             email: email,
                    //             password: hash,
                    //             phone: phone
                    //         })
                    //             .then(user => {
                    //                 console.log("User Data", user)
                    //                 res.json(user)
                    //             })
                    //             .catch(err => res.json(err))
                    //     })
                    //     .catch(err => console.log())
                    console.log("Similar Email Found 0")
                    let hashPassword = await bcrypt.hash(password, 10)
                    console.log("Hased Password : ", hashPassword)
                    const registerUser = 'INSERT INTO `userlogin` (name, email, password, phone) VALUES (?,?,?,?) '
                    const result = await db.promise().query(registerUser, [username, email, hashPassword, phone]);
                    if (!result) {
                        console.log("not entered")
                    } else {
                        return res.json({ msg: "Registration Successful . . . ", msg_type: "good" })
                    }
                    // db.query(registerUser, [username, email, hashPassword, phone], (err, result) => {
                    //     if (err) {
                    //         console.log(err)
                    //     } else {
                    //         return res.json({ msg: "Registration Successful . . . ", msg_type: "good" })
                    //     }
                    // })
                }
            }
        })

        // console.log(hashPassword)
    }
})

/* Registration API  Completed*/


/* Login API */

app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,6}$/;
    if (!email.match(emailRegex)) {
        return res.json({ msg: "Invalid email format", msg_type: 'error' });
    }
    // if (!password.match(passwordRegex)) {
    //     return res.json({ msg: "Password must have at least 1 capital letter, 1 small letter, 1 number, and 1 special character", msg_type: 'error' });
    // }
    //Directly in MongoDB
    //     UserModel.findOne({ email: email })
    //         .then(user => {
    //             if (user) {
    //                  Now we check the password and other functionality
    //             } else {
    //                 return res.json("User Doesn't Exists")
    //             }
    //         })
    const chkEmail = "SELECT * FROM userlogin WHERE email=?"
    db.query(chkEmail, [email], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            if (result.length <= 0) {
                return res.json({ msg: "Email Doesn't Exists. . Please Register First .", msg_type: "error" })
            }
            else {
                bcrypt.compare(password, result[0].password, (err, findout) => {
                    if (!findout) {
                        return res.json({ msg: "Password Didn't Match. .  Please try again !", msg_type: "error" })
                    }
                    else {
                        const token = jwt.sign({ email: result[0].email, username: result[0].name, id: result[0].id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.EXPIRES_IN })
                        res.cookie('token', token)
                        return res.json({ msg: "Login Successfully . . .", msg_type: "good" })
                    }
                })
            }
        }
    })
})

/* Login API Ends*/

/* User Logged In or Not */

const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ msg: "Token is not available", msg_type: "error" })
    } else {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.json("Token is wrong")
            } else {
                req.email = decoded.email
                req.username = decoded.username
                req.userId = decoded.id
                next()
            }
        })
    }
}

app.get('/loggin', verifyUser, (req, res) => {
    return res.json({ email: req.email, username: req.username })
})

/* User Logged In or Not */

/* Logout */

app.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ msg: "Logout Successful . . .", msg_type: "good" })
})

/* Logout Ends */

/* Uploading the post with images */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})


app.post('/create', verifyUser, upload.single('image'), (req, res) => {
    console.log("User ID : ", req.userId)
    console.log("Backend File Storing Processing . . .")
    console.log(req.file)
    //This method is at the starting to create the table 
    // const creatingTable = "CREATE TABLE `posts` (`id` INT NOT NULL ,`title` VARCHAR(255) NOT NULL,`description` TEXT(5000) NOT NULL,`file` VARCHAR(255) NOT NULL,PRIMARY KEY (`id`)"
    // db.query(creatingTable, (err, respond) => {
    //     if (err) {
    //         console.log("Table Already Exists : Posts")
    //         const sql = 'SELECT * from Posts'
    //         db.query(sql, (err, data) => {
    //             if (err) {
    //                 console.log(err)
    //             } else {
    //                 console.log(data)
    //                 return res.send(data)
    //             }
    //         })
    //     }
    //     else {
    //         console.log("Table Created Named as : Posts")
    //     }
    // })

    //But this time we will use the PostModel
    PostModel.create({ userId: req.userId, title: req.body.title, description: req.body.description, file: req.file.filename })
        .then(result => {
            console.log(result)
            return res.json({ msg: "Uploaded", msg_type: "good" })
        })
        .catch(err => {
            console.log(err)
            return res.json({ msg: "Upload Failed", msg_type: "error" })
        })
})
/* Uploading the post with images Ends */


/* Showing the data on home page */

app.get('/get-all-posts', (req, res) => {
    PostModel.findAll()
        .then(posts => { return res.json(posts) })
        .catch(err => console.log(err))
})

/* Showing the data on home page Ends */
app.listen(port, () => {
    console.log("Running Backend Side at ", `${port}`)
})