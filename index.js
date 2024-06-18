const app = require("express");

const server = app();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Rich",
      email: "hello@prisma.com",
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {},
  });
  console.dir(allUsers, { depth: null });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

server.listen(8000, () => {
  console.log("Server Started");
});
