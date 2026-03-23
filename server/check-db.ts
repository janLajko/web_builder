import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const project = await prisma.websiteProject.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { versions: { orderBy: { createdAt: 'desc' }, take: 1 } }
  });

  if (!project) {
    console.log("No projects found");
    return;
  }

  console.log(`Project: ${project.name}`);
  console.log(`ID: ${project.id}`);
  console.log("--- LATEST CODE ---");
  console.log(project.currentCode);
}

main().catch(console.error).finally(() => prisma.$disconnect());
