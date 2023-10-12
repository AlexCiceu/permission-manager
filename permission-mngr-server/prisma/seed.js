const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const jdoe = await prisma.user.upsert({
        where: {email: 'jdoe@mail.com'},
        update: {},
        create: {
            email: 'jdoe@mail.com',
            name: 'John Doe',
            isAdmin: true,
            password: 'pass',
        }
    });

    console.log({jdoe});
};

main()
.then(async() => {
    await prisma.$disconnect();
})
.catch(async(e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});