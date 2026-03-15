import { PrismaClient } from '@prisma/client'
import { destinations } from '../src/lib/data'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database with destinations...')

    for (const destination of destinations) {
        await prisma.destination.upsert({
            where: { name: destination.name },
            update: {},
            create: {
                name: destination.name,
                region: destination.region,
                description: destination.description,
                details: destination.details,
                image: destination.image,
                price: destination.price,
                rating: destination.rating,
                category: destination.category,
                featured: true // Just making the initial ones featured
            }
        })
    }

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
