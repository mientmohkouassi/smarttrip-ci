import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    console.log("🔍 Querying Supabase User table directly...\n");

    const users = await prisma.user.findMany({
        select: { id: true, email: true, name: true, role: true, emailVerified: true }
    });

    if (users.length === 0) {
        console.log("✅ User table is completely EMPTY.");
    } else {
        console.log(`⚠️  Found ${users.length} user(s):\n`);
        users.forEach(u => {
            console.log(`  → id:    ${u.id}`);
            console.log(`    email: ${u.email}`);
            console.log(`    name:  ${u.name}`);
            console.log(`    role:  ${u.role}`);
            console.log(`    emailVerified: ${u.emailVerified}\n`);
        });
    }

    const accounts = await prisma.account.findMany({ select: { userId: true, provider: true } });
    console.log(`Account records: ${accounts.length}`);

    const sessions = await prisma.session.findMany({ select: { userId: true } });
    console.log(`Session records: ${sessions.length}`);

    const verif = await prisma.verificationToken.findMany();
    console.log(`VerificationToken records: ${verif.length}`);
}

main()
    .catch((e) => { console.error("❌ DB Error:", e.message); process.exit(1); })
    .finally(() => prisma.$disconnect());
