const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const retrieveAllTemplates = async (req, res, next) => {
	try {
		const retrievedTemplates = await prisma.permissionTemplate.findMany();

		if (retrievedTemplates !== null) {
			return res.json({
				templates: retrievedTemplates,
			});
		} else {
			return res.json({
				message: 'There are no templates.',
			});
		}
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

const createTemplate = async (req, res, next) => {
	data = req.body.data;

	try {
		await prisma.permissionTemplate.create({
			data: {
				templateName: data.newTemplate.templateName,
				permissions: data.newTemplate.permissions,
			},
		});

		return res.json({
			message: `Created Permission Template - ${data.newTemplate.templateName}`,
		});
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

const updateTemplate = async (req, res, next) => {
	data = req.body.data;

	try {
		await prisma.permissionTemplate.update({
			where: {
				id: parseInt(req.query.id),
			},
			data: {
				templateName: data.newTemplate.templateName,
				permissions: data.newTemplate.permissions,
			},
		});

		return res.json({
			message: `Updated Permission Template.`,
		});
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

const deleteTemplate = async (req, res, next) => {
	try {
		// Prisma takes care of de-referencing the relationships by default
		await prisma.permissionTemplate.delete({
			where: {
				id: parseInt(req.query.id),
			},
		});

		return res.json({
			message: `Deleted Permission Template.`,
		});
	} catch (e) {
		return res.status(500).json({
			message: `Something went wrong.`,
			errorCode: e.code,
		});
	}
};

module.exports = {
	retrieveAllTemplates,
	createTemplate,
	updateTemplate,
	deleteTemplate,
};
