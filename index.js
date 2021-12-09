// import required libraries
const express = require("express")
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Load controllers
const Login = require('./login');
const Register = require('./register');
const SpeechController = require('./speech_controller');

// initialize the express app
const app = express();

// load middlewares
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

exports.JWT_SECRET_TOKEN = "myFinalProject";
JWT_SECRET_TOKEN1 = "myFinalProject";

// Auth middleware
const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_TOKEN1);
        req.user_id = data.id;
        req.username = data.username;
        return next();
    } catch (e) {
        console.error(e)
        return res.sendStatus(403);
    }
};


// Load routes
app.use('/login', Login);
app.use('/register', Register);
app.use('/text2speech', authorization, SpeechController);


app.get("/logout", authorization, (req, res) => {
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "Successfully logged out" });
});

app.listen(3000, () =>
    console.log(`Project is running on port 3000!`),
);