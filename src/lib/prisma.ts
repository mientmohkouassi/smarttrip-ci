// Mock Prisma Client to bypass environment issues with generation
// This allows the UI to function while the Prisma CLI issue is resolved

export const prisma = {
    user: {
        findUnique: async ({ where }: any) => {
            if (where.email === 'user@smarttrip.ci') {
                return {
                    id: '1',
                    name: 'Demo Traveler',
                    email: 'user@smarttrip.ci',
                    password: '$2a$10$DEMO_HASH_FOR_USER1234', // bcrypt mock
                    role: 'user',
                };
            }
            return null;
        },
        upsert: async (data: any) => data.create,
    },
    destination: {
        findMany: async () => [
            { id: '1', name: 'Assinie-Mafia', region: 'Sud-Comoé', price: 150000, image: '/images/destinations/assinie.png', category: 'Beach', rating: 4.8 },
            { id: '2', name: 'Yamoussoukro', region: 'Bélier', price: 85000, image: '/images/destinations/yamoussoukro.png', category: 'Culture', rating: 4.6 },
        ],
        findUnique: async ({ where }: any) => {
            const dests: any[] = [
                { id: '1', name: 'Assinie-Mafia', region: 'Sud-Comoé', description: 'Beach getaway', price: 150000, image: '/images/destinations/assinie.png', category: 'Beach', rating: 4.8 },
                { id: '2', name: 'Yamoussoukro', region: 'Bélier', description: 'Basilica city', price: 85000, image: '/images/destinations/yamoussoukro.png', category: 'Culture', rating: 4.6 },
            ];
            return dests.find(d => d.id === where.id) || null;
        },
        upsert: async (data: any) => data.create,
    },
    booking: {
        findMany: async ({ where }: any) => {
            // Return a dummy booking for the demo user
            return [
                {
                    id: 'b1',
                    userId: '1',
                    destinationId: '1',
                    startDate: new Date(),
                    endDate: new Date(Date.now() + 86400000 * 3),
                    totalPrice: 150000,
                    status: 'confirmed',
                    destination: { name: 'Assinie-Mafia', image: '/images/destinations/assinie.png' }
                }
            ];
        },
        create: async ({ data }: any) => ({ id: 'new-b-' + Math.random(), ...data }),
    },
} as any;
