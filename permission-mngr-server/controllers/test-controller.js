// Controller for testing authentication

const testAuth = (req, res, next) => {
	res.json({ message: 'User is logged in.' });
};

module.exports = { testAuth };
