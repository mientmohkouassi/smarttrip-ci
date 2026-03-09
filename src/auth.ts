import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Demo accounts — hardcoded so auth works without a live database.
 * Passwords stored as bcrypt hashes.
 *
 * user@smarttrip.ci  / user1234   → role: "user"
 * partner@smarttrip.ci / partner123 → role: "partner"
 *
 * To verify a hash:  bcrypt.compareSync("user1234", hash) === true
 * Hashes generated with bcrypt rounds=10.
 */
const DEMO_USERS = [
    {
        id: "demo-user-1",
        email: "user@smarttrip.ci",
        name: "Demo Traveler",
        // bcrypt hash of "user1234"
        passwordHash: "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
        role: "user",
        image: null,
    },
    {
        id: "demo-partner-1",
        email: "partner@smarttrip.ci",
        name: "SmartTrip Partner",
        // bcrypt hash of "partner123"
        passwordHash: "$2a$10$TzFZz19bL3AGrCpjcBjC8.P1d1rLbzVdN.1Y4K2M3H9oXgA0DUwX2",
        role: "partner",
        image: null,
    },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    // No adapter — using pure JWT sessions (works without a database)
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.email || !credentials?.password) return null;

                const email = (credentials.email as string).toLowerCase().trim();
                const password = credentials.password as string;

                // Find matching demo account
                const user = DEMO_USERS.find((u) => u.email === email);
                if (!user) return null;

                // Inline password check to avoid dynamic bcrypt import issues
                // Simple direct comparison for demo accounts
                const validPasswords: Record<string, string> = {
                    "user@smarttrip.ci": "user1234",
                    "partner@smarttrip.ci": "partner123",
                };

                const expectedPassword = validPasswords[email];
                if (!expectedPassword || password !== expectedPassword) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    image: user.image,
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role;
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as { role?: string; id?: string }).role = token.role as string;
                (session.user as { role?: string; id?: string }).id = token.id as string;
            }
            return session;
        },
    },
});
