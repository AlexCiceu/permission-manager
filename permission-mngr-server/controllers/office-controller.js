const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const retrieveAllOffices = async (req, res, next) => {
	try {
		const retrievedOffices = await prisma.office.findMany();

		if (retrievedOffices !== null) {
			return res.json({
				offices: retrievedOffices,
			});
		} else {
			return res.json({
				message: 'There are no offices.',
				offices: [],
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

// Unused currently, might remove since User can get current office from list of all offices based on officeId
const retrieveCurrentOffice = async (req, res, next) => {
	try {
		const currentOffice = await prisma.user.findFirst({
			include: {
				office: true,
			},
			where: {
				id: req.session.user.id,
			},
		});

		if (currentOffice !== null) {
			return res.json({
				offices: currentOffice,
			});
		} else {
			return res.json({
				message: 'User is not part of an office.',
				offices: {},
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

const createOffice = async (req, res, next) => {
	data = req.body.data;

	try {
		if (req.session.user.isAdmin) {
			await prisma.office.create({
				data: {
					name: data.newOffice.name,
					street: data.newOffice.street,
					city: data.newOffice.city,
					country: data.newOffice.country,
					phone: parseInt(data.newOffice.phone),
					email: data.newOffice.email,
					isMasterOffice: false,
					users: {
						connect: data.newOffice.users.map((x) => {
							return { id: x };
						}),
					},
				},
			});

			return res.json({
				message: `Created office - ${data.newOffice.name}`,
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

const updateOffice = async (req, res, next) => {
	const data = {};

	for (const key of Object.keys(req.body.data)) {
		if (req.body[key] !== '') {
			data[key] = req.body.data[key];
		}
	}

	try {
		if (req.session.user.isAdmin) {
			await prisma.office.update({
				where: {
					id: parseInt(req.body.officeId),
				},
				data: data,
			});

			return res.json({
				message: `Updated office - ${data.name}`,
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

const deleteOffice = async (req, res, next) => {
	const data = req.body;

	try {
		if (req.session.user.isAdmin) {
			await prisma.office.delete({
				where: {
					id: parseInt(data.officeId),
				},
			});

			return res.json({
				message: `Deleted office - ${data.officeId}`,
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

module.exports = {
	retrieveAllOffices,
	retrieveCurrentOffice,
	createOffice,
	updateOffice,
	deleteOffice,
};
