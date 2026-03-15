import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Securing Supabase Database by enabling RLS on all tables...");

    // The list of all our tables
    const tables = ['Account', 'Session', 'User', 'VerificationToken', 'Destination', 'Booking', 'SavedGem'];

    for (const table of tables) {
        // This enables Row Level Security, which defaults to DENY ALL for the public REST API.
        // It does not affect Prisma, because Prisma connects with the master postgres password.
        await prisma.$executeRawUnsafe(`ALTER TABLE "${table}" ENABLE ROW LEVEL SECURITY;`);
        console.log(`RLS Enabled for table: ${table}`);
    }

    console.log("Database secured successfully! Public REST API access is now blocked.");
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
