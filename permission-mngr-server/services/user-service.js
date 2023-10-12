const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const retrieveUserPermissions =  async (permissionTemplateId) => {
    try { 
        const templates = await prisma.permissionTemplate.findFirst({
            where: {
                id: parseInt(permissionTemplateId)
            }
        });

        return templates.permissions;
    } catch (e) {
        console.log('Error retrieving permissions.')
    }
};

module.exports = {retrieveUserPermissions}