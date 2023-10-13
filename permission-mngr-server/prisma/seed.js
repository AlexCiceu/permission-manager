const { PrismaClient, Permissions } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	const company = await prisma.company.upsert({
		where: { name: 'Big Corporation' },
		update: {},
		create: {
			name: 'Big Corporation',
			website: 'http://www.bigcorp.com',
			email: 'bigco@mail.com',
			description:
				"Welcome to Big Corporation, where synergy meets innovation, and paradigm-shifting solutions are our daily bread. At Big Corp, we don't just think outside the box \u2013 we've redefined the very concept of boxes. As a cutting-edge powerhouse in the business landscape, we leverage a robust ecosystem of disruptive technologies, fostering a culture of proactive ideation that transcends traditional boundaries.",
		},
	});
	console.log({ company });

	const office = await prisma.office.upsert({
		where: { name: 'Big Corp Main Office' },
		update: {},
		create: {
			name: 'Big Corp Main Office',
			email: 'mainofficeo@mail.com',
			street: 'Big Co. Office Lane nr. 2',
			city: 'Bucharest',
			country: 'Romania',
			phone: 0o40321321,
			isMasterOffice: true,
		},
	});
	console.log({ office });

	const admin = await prisma.user.upsert({
		where: { email: 'admin@mail.com' },
		update: {},
		create: {
			email: 'admin@mail.com',
			name: 'Admin Joe',
			isAdmin: true,
			password: 'pass',
			permissionTemplateId: 1,
			officeId: 1,
		},
	});
	console.log({ admin });

	const user1 = await prisma.user.upsert({
		where: { email: 'user1@mail.com' },
		update: {},
		create: {
			email: 'user1@mail.com',
			name: 'User Jeff',
			isAdmin: false,
			password: 'pass',
			permissionTemplateId: 2,
			officeId: 1,
		},
	});
	console.log({ user1 });

	const user2 = await prisma.user.upsert({
		where: { email: 'user2@mail.com' },
		update: {},
		create: {
			email: 'user2@mail.com',
			name: 'User Frank',
			isAdmin: false,
			password: 'pass',
			permissionTemplateId: 2,
			officeId: 1,
		},
	});
	console.log({ user2 });

	const templateAll = await prisma.permissionTemplate.upsert({
		where: { templateName: 'All Permissions' },
		update: {},
		create: {
			templateName: 'All Permissions',
			permissions: [
				Permissions.READ,
				Permissions.WRITE,
				Permissions.DELETE,
			],
		},
	});
	console.log({ templateAll });

	const templateReadOnly = await prisma.permissionTemplate.upsert({
		where: { templateName: 'Read Only' },
		update: {},
		create: {
			templateName: 'Read Only',
			permissions: [Permissions.READ],
		},
	});
	console.log({ templateReadOnly });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
