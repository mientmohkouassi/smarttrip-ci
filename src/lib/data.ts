export interface Destination {
    id: string;
    name: string;
    region: string;
    description: string;
    image: string;
    price: number;
    rating: number;
    category: string;
    details?: string;
}

export const destinations: Destination[] = [
    {
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
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
        id: "5",
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
        id: "6",
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
        id: "7",
        name: "San Pédro",
        region: "San-Pédro",
        description: "The world's largest cocoa exporting port with stunning nearby beaches.",
        details: "San Pédro is a vital economic hub and the second-largest port in Ivory Coast. Beyond its industrial importance, it serves as a gateway to some of the most beautiful and wild beaches in the country, like Monogaga.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        price: 110000,
        rating: 4.5,
        category: "Beach"
    }
];

export interface Partner {
    id: string;
    name: string;
    logo: string;
    tier: 'Premium' | 'Gold' | 'Standard';
    description: string;
}

export const partners: Partner[] = [
    {
        id: "p1",
        name: "Air Côte d'Ivoire",
        logo: "/images/partners/air-ci.jpg",
        tier: "Premium",
        description: "The national flag carrier, providing seamless connections across West Africa."
    },
    {
        id: "p2",
        name: "Sofitel Abidjan Hotel Ivoire",
        logo: "/images/partners/sofitel.jpg",
        tier: "Premium",
        description: "An iconic landmark of luxury and elegance in the heart of Abidjan."
    },
    {
        id: "p3",
        name: "Wave Mobile Money",
        logo: "/images/partners/wave-logo.png",
        tier: "Gold",
        description: "Revolutionizing digital payments for travelers and locals alike."
    },
    {
        id: "p4",
        name: "Orange CI",
        logo: "/images/partners/orance-ci-logo.png",
        tier: "Gold",
        description: "Ensuring high-speed connectivity throughout your journey in Ivory Coast."
    },
    {
        id: "p5",
        name: "Sixt Rent a Car",
        logo: "/images/partners/sixt-rent-car.png",
        tier: "Standard",
        description: "Premium car rental services for your personal exploration."
    },
    {
        id: "p6",
        name: "Yango",
        logo: "/images/partners/yango-logo.png",
        tier: "Standard",
        description: "Modern ride-hailing services for effortless urban mobility."
    },
    {
        id: "p7",
        name: "Heetch",
        logo: "/images/partners/heetch-logo.jpg",
        tier: "Standard",
        description: "Reliable and friendly urban transport solutions across Abidjan."
    }
];

export const carouselImages = [
    {
        id: "1",
        url: "/images/destinations/assinie.png",
        title: "Assinie Beach",
        description: "Pristine sands and turquoise waters."
    },
    {
        id: "2",
        url: "/images/destinations/yamoussoukro.png",
        title: "Basilica of Yamoussoukro",
        description: "The largest Christian church in the world."
    },
    {
        id: "3",
        url: "/images/destinations/grand_bassam.png",
        title: "Grand-Bassam Historic Town",
        description: "A UNESCO World Heritage colonial gem."
    },
    {
        id: "4",
        url: "/images/destinations/man.png",
        title: "The Mountains of Man",
        description: "Breath-taking views of the 18 mountains."
    }
];
