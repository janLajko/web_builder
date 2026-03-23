import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
    const projectId = '8a6a8515-ea64-4b66-be20-ae837f40d720';
    const dummyCode = '<html><body style="background: #111; color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: sans-serif;"><h1>DivStack AI Built Your Project!</h1><p>The code is now successfully loading from the database fallback!</p></body></html>';

    await prisma.websiteProject.updateMany({
        where: { id: projectId },
        data: { currentCode: dummyCode }
    });

    console.log('Project updated successfully with dummy code!');
}

run().catch(console.error).finally(() => prisma.$disconnect());
