import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
    const project = await prisma.websiteProject.findFirst({
        orderBy: { updatedAt: 'desc' }
    });
    console.log('Contains Tailwind:', project?.currentCode?.includes('cdn.tailwindcss.com'));
    console.log('Contains HTML Tag:', project?.currentCode?.includes('<html'));
    console.log('--- Code snippet ---');
    console.log(project?.currentCode?.substring(0, 1000));
}

check().catch(console.error).finally(() => prisma.$disconnect());
