const { PrismaClient } = require('@prisma/client');
const { users, challenges, completions } = require('./data');

const prisma = new PrismaClient()

async function main() {
    await prisma.completions.deleteMany();
    console.log('Deleted records in completion table');

    await prisma.challenges.deleteMany();
    console.log('Deleted records in challenge table');
   
    await prisma.users.deleteMany();
    console.log('Deleted records in user table');

    await prisma.users.createMany({
      data: users,
    });
    console.log('Added user data');

    await prisma.challenges.createMany({
      data: challenges,
    });
    console.log('Added challenge data');

    await prisma.completions.createMany({
      data: completions,
    });
    console.log('Added completion data');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });