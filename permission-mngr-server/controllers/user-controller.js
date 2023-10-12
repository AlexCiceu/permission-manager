const permissions = require('../services/user-service');
const { PrismaClient, Permissions } = require('@prisma/client');
const prisma = new PrismaClient();

const retrieveAllUsers = async (req, res, next) => {
	const userPermissions = await permissions.retrieveUserPermissions(
		req.session.user.permissionTemplateId
	);

	if (userPermissions.includes(Permissions.READ)) {
		try {
			let retrievedUsers;

			if (req.query.officeId) {
				retrievedUsers = await prisma.user.findMany({
					where: {
						officeId: parseInt(req.query.officeId),
					},
				});
			} else {
				retrievedUsers = await prisma.user.findMany();
			}

			if (retrievedUsers !== null) {
				return res.json({
					users: retrievedUsers,
				});
			} else {
				return res.json({
					message: 'There are no users.',
					users: [],
				});
			}
		} catch (e) {
			return res.status(500).json({
				message: `Something went wrong.`,
				errorCode: e.code,
			});
		}
	} else {
		return res.status(403).json({
			message: `Forbidden, user doesn't have the required permissions to execute action.`,
		});
	}
};

const createUser = async (req, res, next) => {
	data = req.body;
	const userPermissions = await permissions.retrieveUserPermissions(
		req.session.user.permissionTemplateId
	);

	if (userPermissions.includes(Permissions.WRITE)) {
		try {
			await prisma.user.create({
				data: {
					name: data.name,
					email: data.email,
					isAdmin: JSON.parse(data.isAdmin.toLowerCase()),
					officeId: parseInt(data.officeId),
					permissionTemplateId: parseInt(data.permissionTemplateId),
				},
			});

			return res.json({
				message: `Created user - ${data.name}.`,
			});
		} catch (e) {
			return res.status(500).json({
				message: `Something went wrong.`,
				errorCode: e.code,
			});
		}
	} else {
		return res.status(403).json({
			message: `Forbidden, user doesn't have the required permissions to execute action.`,
		});
	}
};

const updateUser = async (req, res, next) => {};

const deleteUser = async (req, res, next) => {};

module.exports = { retrieveAllUsers, createUser, updateUser, deleteUser };
