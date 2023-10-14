const permissions = require('../services/user-service');
const { PrismaClient, Permissions } = require('@prisma/client');
const prisma = new PrismaClient();

const retrieveAllUsers = async (req, res, next) => {
	try {
		let retrievedUsers;

		if (req.query.officeId) {
			retrievedUsers = await prisma.user.findMany({
				where: {
					officeId: parseInt(req.query.officeId),
				},
				include: {
					office: true,
					permissionTemplate: true,
				},
			});
		} else {
			retrievedUsers = await prisma.user.findMany({
				include: {
					office: true,
					permissionTemplate: true,
				},
			});
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
};

const createUser = async (req, res, next) => {
	data = req.body.data;

	const userPermissions = await permissions.retrieveUserPermissions(
		req.session.user.permissionTemplateId
	);

	if (userPermissions.includes(Permissions.WRITE)) {
		try {
			await prisma.user.create({
				data: {
					name: data.newUser.name,
					email: data.newUser.email,
					isAdmin: data.newUser.isAdmin,
					password: data.newUser.password,
					officeId: parseInt(data.newUser.officeId) || null,
					permissionTemplateId:
						parseInt(data.newUser.permissionTemplateId) || null,
				},
			});

			return res.json({
				message: `Created user - ${data.newUser.name}`,
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

const updateUser = async (req, res, next) => {
	data = req.body.data;

	try {
		await prisma.user.update({
			where: {
				id: parseInt(req.query.id),
			},
			data: {
				name: data.newUser.name,
				email: data.newUser.email,
				isAdmin: data.newUser.isAdmin,
				password: data.newUser.password,
				officeId: parseInt(data.newUser.officeId) || null,
				permissionTemplateId:
					parseInt(data.newUser.permissionTemplateId) || null,
			},
		});

		return res.json({
			message: `Updated User.`,
		});
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

const deleteUser = async (req, res, next) => {
	try {
		// Prisma takes care of de-referencing the relationships by default
		await prisma.user.delete({
			where: {
				id: parseInt(req.query.id),
			},
		});

		return res.json({
			message: `Deleted User.`,
		});
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

module.exports = { retrieveAllUsers, createUser, updateUser, deleteUser };
