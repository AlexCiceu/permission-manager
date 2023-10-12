const express = require("express");
const session = require("express-session");
const cors = require("cors");

// Routes imports
const testRoute = require("./routes/test-route");
const authRoute = require("./routes/auth-route");

// General server config
const app = express();

app.use(cors());
app.use(session({
    secret: 'someWhateverSecret',
    resave: true,
    saveUninitialized: true
}));

// TODO: maybe configure the port in the env, now it relies just on the default
const port = process.env.PORT || 4000;

// Useful to check successful startup
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});

// JSON only middle-ware that also checks for correct Content-Type header
app.use(express.json())
	
// Authentication and Authorization Middleware
const auth = (req, res, next) => {
    if (req.session) {
        return next();
    } else {
        return res.sendStatus(401);
    }
};

// Protected Routes
app.use('/test', auth, testRoute);

// Unprotected Routes
app.use('/auth', authRoute)