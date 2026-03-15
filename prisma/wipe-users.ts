/**
 * prisma/wipe-users.ts
 * Wipes ALL user, account, session, and verification data from Supabase.
 * Run with: npx tsx prisma/wipe-users.ts
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    console.log("🗑️  Wiping all authentication data from Supabase...\n");
    const del4 = await prisma.verificationToken.deleteMany();
    console.log(`  ✓ VerificationToken: ${del4.count} deleted`);
    const del2 = await prisma.session.deleteMany();
    console.log(`  ✓ Session: ${del2.count} deleted`);
    const del1 = await prisma.account.deleteMany();
    console.log(`  ✓ Account: ${del1.count} deleted`);
    const del5 = await prisma.savedGem.deleteMany();
    console.log(`  ✓ SavedGem: ${del5.count} deleted`);
    const del3 = await prisma.booking.deleteMany();
    console.log(`  ✓ Booking: ${del3.count} deleted`);
    const del6 = await prisma.user.deleteMany();
    console.log(`  ✓ User: ${del6.count} deleted`);
    console.log("\n✅ Database wiped. All auth and user data cleared. Destinations untouched.");
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
