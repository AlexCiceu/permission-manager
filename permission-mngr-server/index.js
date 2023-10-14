const express = require('express');
const session = require('express-session');
const cors = require('cors');

// Routes imports
const testRoute = require('./routes/test-route');
const authRoute = require('./routes/auth-route');
const officeRoute = require('./routes/office-route');
const userRoute = require('./routes/user-route');
const templateRoute = require('./routes/template-route');
const companyRoute = require('./routes/company-route');

// General server config
const app = express();

app.use(
	cors({
		credentials: true,
		origin: 'http://localhost:3000',
	})
);
app.use(
	session({
		secret: 'someWhateverSecret',
		resave: true,
		saveUninitialized: true,
	})
);

// TODO: maybe configure the port in the env, now it relies just on the default
const port = process.env.PORT || 4000;

// Useful to check successful startup
app.listen(port, () => {
	console.log(`App listening on http://localhost:${port}`);
});

// JSON only middle-ware that also checks for correct Content-Type header
app.use(express.json());

// Authentication and Authorization Middleware
const auth = (req, res, next) => {
	// Naive implementation
	if (req.session && req.session.user) {
		return next();
	} else {
		return res.sendStatus(401);
	}
};

// Protected Routes
app.use('/test', auth, testRoute);
app.use('/office', auth, officeRoute);
app.use('/user', auth, userRoute);
app.use('/template', auth, templateRoute);
app.use('/company', auth, companyRoute);

// Unprotected Routes
app.use('/auth', authRoute);
