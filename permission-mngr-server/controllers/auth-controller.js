// Authentication controllers

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res, next) => {
	const data = req.body;

	try {
		const retrievedUser = await prisma.user.findUnique({
			where: {
				email: data.email,
			},
		});

		if (retrievedUser !== null) {
			if (data.password === retrievedUser.password) {
				// Naive session based implementation
				req.session.user = retrievedUser;

				res.json({
					message: 'Login successful.',
					user: req.session.user,
				});
			} else {
				return res.status(401).json({
					message: 'Wrong password.',
				});
			}
		} else {
			return res.status(400).json({
				message: "User doesn't exist.",
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Something went wrong.',
		});
	}
};

//TODO: add check to logout only logged in users, maybe make authorized route?
const logout = (req, res, next) => {
	req.session.destroy();
	res.json({
		mesage: 'Logout successful.',
	});
};

module.exports = { login, logout };
