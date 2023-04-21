import prisma from "./prisma";

const resetDb = async () => {
    await prisma.user.deleteMany();
    await prisma.uploadFood.deleteMany();
}

resetDb();