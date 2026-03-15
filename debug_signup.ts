import { prisma } from "./src/lib/prisma";
import bcrypt from "bcryptjs";

async function debugSignup() {
    const data = {
        name: "Test User",
        email: "test-" + Date.now() + "@example.com",
        password: "Password123!",
        role: "user" as const
    };

    try {
        console.log("Starting debug signup for:", data.email);
        const hashedPassword = await bcrypt.hash(data.password, 12);
        console.log("Bcrypt hashed successfully");

        const user = await prisma.user.create({
            data: { 
                name: data.name, 
                email: data.email, 
                password: hashedPassword, 
                role: data.role 
            },
        });
        console.log("User created successfully in DB:", user.id);
    } catch (error: any) {
        console.error("DETAILED SIGNUP ERROR:", error);
        if (error.code) console.error("Prisma Error Code:", error.code);
        if (error.meta) console.error("Prisma Error Meta:", error.meta);
    } finally {
        await prisma.$disconnect();
    }
}

debugSignup();
