const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Simple look-up since we have only 1 Company
// In multi-company scenarios we would look at the Company attached to the Office that the User is associated to
const retrieveCompanyInfo = async (req, res, next) => {
	try {
		const companyInfo = await prisma.company.findUnique({
			where: {
				id: 1,
			},
		});

		res.json({
			companyInfo: companyInfo,
		});
	} catch (e) {
		return res.status(500).json({
			message: 'Something went wrong.',
		});
	}
};

module.exports = { retrieveCompanyInfo };
