const express= require("express");
const cors= require("cors");

const bodyParser= require("body-parser");
const cookieParser= require("cookie-parser");
const session= require("express-session");
const jwt= require('jsonwebtoken')
require("dotenv").config();

const app= express();
app.use(express.json());


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "User_ID",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const loginRouter = require("./routes/login");
app.use(loginRouter);

const registerRouter = require("./routes/register");
app.use(registerRouter);

const addServicesRouter = require("./routes/addServices");
app.use(addServicesRouter);

const updateServicesRouter = require("./routes/updateService");
app.use(updateServicesRouter);

const deleteServicesRouter = require("./routes/deleteItems");
app.use(deleteServicesRouter);

const userRoleRouter = require("./routes/userRole");
app.use(userRoleRouter);

const updateRoleRouter = require("./routes/updateRole");
app.use(updateRoleRouter);

const updateUserRouter = require("./routes/updateUser");
app.use(updateUserRouter);

const profileImageRouter = require("./routes/profileImage");
app.use(profileImageRouter);

const accountDeleteRouter = require("./routes/accountDelete");
app.use(accountDeleteRouter);


const demoteAdminRotuer = require("./routes/demoteAdmin");
app.use(demoteAdminRotuer);

const adminDetailsRouter = require("./routes/adminDetail");
app.use(adminDetailsRouter);

const verifyJWT= (req, res, next) => {
    const token = req.headers["authorization"]

    if(!token){
        res.json({auth: false, message:"Yo, we need a token, pls give it to us next time!"})
    } else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err){
                res.json({auth: false, message:"You failed to authenticate"})
            } else{
                req.userId= decoded.id;
                next();
            }
        }); 
    }
};

app.post('/isUserAuth', verifyJWT, (req, res) => {
    res.json({ auth: true, message:"Yo, you are authenticated congo"})
})


app.listen(3001, () => {
    console.log("running server");
});

