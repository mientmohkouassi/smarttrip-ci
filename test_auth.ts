import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "mientmohfrejustekouassi@gmail.com";
  const password = "Password123!";
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
      console.log("User not found.");
      return;
  }
  
  const isValid = await bcrypt.compare(password, user.password || "");
  console.log(`Password is valid: ${isValid}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
