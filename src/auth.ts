import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

/** Simple in-memory rate limiter for failed login attempts (OWASP A07) */
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const record = loginAttempts.get(key);

    if (!record || now > record.resetAt) {
        loginAttempts.set(key, { count: 1, resetAt: now + 15 * 60 * 1000 }); // 15-min window
        return true; // allowed
    }
    if (record.count >= 10) {
        return false; // blocked — too many attempts
    }
    record.count++;
    return true;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
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

                // OWASP A07: Brute-force protection (rate limit per email)
                if (!checkRateLimit(email)) {
                    throw new Error("TooManyAttempts");
                }

                // OWASP A03: Prisma uses parameterised queries — injection-safe
                const user = await prisma.user.findUnique({ where: { email } });

                // OWASP A07: Always run bcrypt to prevent timing attacks
                const fakeHash = "$2b$10$fakefakefakefakefakefakefakefakefakefakefake";
                const isValid = user?.password
                    ? await bcrypt.compare(password, user.password)
                    : await bcrypt.compare(password, fakeHash).then(() => false);

                if (!user || !isValid) return null;

                return {
                    id: user.id,
                    name: user.name ?? "",
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
    callbacks: {
        jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = (user as { role?: string }).role;
                token.id = user.id;
            }
            if (trigger === "update" && session) {
                token = { ...token, ...session };
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    // OWASP A02: Force secure cookies in production
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
});
