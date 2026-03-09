import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Create demo users
    const userPassword = await bcrypt.hash("user1234", 10)
    const partnerPassword = await bcrypt.hash("partner123", 10)

    const demoUser = await prisma.user.upsert({
        where: { email: 'user@smarttrip.ci' },
        update: {},
        create: {
            email: 'user@smarttrip.ci',
            name: 'Demo Traveler',
            password: userPassword,
            role: 'user',
        },
    })

    const partnerUser = await prisma.user.upsert({
        where: { email: 'partner@smarttrip.ci' },
        update: {},
        create: {
            email: 'partner@smarttrip.ci',
            name: 'Partner Admin',
            password: partnerPassword,
            role: 'partner',
        },
    })

    console.log({ demoUser, partnerUser })

    // Seed destinations
    const destinations = [
        {
            name: "Assinie-Mafia",
            region: "Sud-Comoé",
            description: "The ultimate beach getaway. Turquoise waters, golden sands, and luxury resorts.",
            details: "Assinie-Mafia is a coastal resort town in south-eastern Ivory Coast. It is a long, narrow peninsula between the Atlantic Ocean and the Aby Lagoon. Known for its high-end villas and pristine beaches, it is the preferred weekend getaway for Abidjan's elite.",
            image: "/images/destinations/assinie.png",
            price: 150000,
            rating: 4.8,
            category: "Beach"
        },
        {
            name: "Yamoussoukro",
            region: "Bélier",
            description: "Home to the world's largest basilica and unique architectural wonders.",
            details: "As the political capital of Ivory Coast, Yamoussoukro is home to the Basilica of Our Lady of Peace, the largest Christian church in the world. The city features wide, tree-lined boulevards and the famous Crocodile Lake near the Presidential Palace.",
            image: "/images/destinations/yamoussoukro.png",
            price: 85000,
            rating: 4.6,
            category: "Culture"
        },
        {
            name: "Grand-Bassam",
            region: "Sud-Comoé",
            description: "UNESCO World Heritage colonial architecture and vibrant artisan markets.",
            details: "The first capital of Ivory Coast, Grand-Bassam is a historic town known for its colonial-era architecture in the 'Quartier France'. It's a UNESCO World Heritage site and a hub for traditional Ivoirian art and craftwork.",
            image: "/images/destinations/grand_bassam.png",
            price: 45000,
            rating: 4.5,
            category: "History"
        },
        {
            name: "Man",
            region: "Tonkpi",
            description: "The city of 18 mountains. Waterfalls, climbing, and traditional mask culture.",
            details: "Man is nestled in a valley surrounded by the lush Dent de Man mountains. Famous for its waterfalls like the Cascade de Man and the La Dent de Man peak, it's the heart of the Dan people's rich cultural heritage.",
            image: "/images/destinations/man.png",
            price: 95000,
            rating: 4.9,
            category: "Nature"
        },
        {
            name: "Abidjan Plateau",
            region: "Lagunes",
            description: "The Manhattan of West Africa. Sophisticated dining and modern cityscapes.",
            details: "The Plateau is the business district of Abidjan, characterized by its towering skyscrapers and modern infrastructure. It sits on a peninsula overlooking the Ebrié Lagoon and is home to the iconic St. Paul's Cathedral.",
            image: "/images/destinations/abidjan.png",
            price: 120000,
            rating: 4.7,
            category: "Urban"
        },
        {
            name: "Korhogo",
            region: "Poro",
            description: "Heart of the Senufo culture. Famous for its weavers, potters, and smiths.",
            details: "Korhogo is the cultural capital of the north. It is the center of the Senufo people, world-renowned for their traditional crafts, including woodcarving, weaving, and the famous 'toile de Korhogo' painted cloths.",
            image: "/images/destinations/korhogo.png",
            price: 75000,
            rating: 4.4,
            category: "Artisan"
        },
        {
            name: "San Pédro",
            region: "San-Pédro",
            description: "The world's largest cocoa exporting port with stunning nearby beaches.",
            details: "San Pédro is a vital economic hub and the second-largest port in Ivory Coast. Beyond its industrial importance, it serves as a gateway to some of the most beautiful and wild beaches in the country, like Monogaga.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
            price: 110000,
            rating: 4.5,
            category: "Beach"
        }
    ]

    for (const dest of destinations) {
        await prisma.destination.upsert({
            where: { name: dest.name },
            update: {},
            create: dest,
        })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
