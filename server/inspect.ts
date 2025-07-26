import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const questions = await prisma.question.findMany({
    orderBy: { createdAt: 'desc' },
  });
  console.log('📋 Preguntas en la base:', questions);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
