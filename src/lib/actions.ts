"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@/lib/auth-client";

export async function signUpUser(data: {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    phone?: string;
    businessName?: string;
    businessCategory?: string;
}) {
    try {
        const email = data.email.toLowerCase().trim();
        const name = data.name.trim();

        // ─── OWASP A03/A04: Server-side input validation ─────────────────
        if (!name || name.length < 2 || name.length > 100) {
            return { success: false, error: "Name must be between 2 and 100 characters." };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: "Please provide a valid email address." };
        }
        if (!data.password || data.password.length < 8) {
            return { success: false, error: "Password must be at least 8 characters long." };
        }
        // Require at least one letter and one number
        if (!/[a-zA-Z]/.test(data.password) || !/[0-9]/.test(data.password)) {
            return { success: false, error: "Password must contain at least one letter and one number." };
        }
        if (!["user", "partner", "admin"].includes(data.role)) {
            return { success: false, error: "Invalid account role." };
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        // OWASP A07: Do NOT reveal if the email exists to prevent enumeration.
        // We make an exception here for UX since it's a direct sign-up form.
        if (existingUser) {
            return { success: false, error: "An account with this email already exists." };
        }

        // OWASP A02: bcrypt with cost factor 12
        const hashedPassword = await bcrypt.hash(data.password, 12);

        await prisma.user.create({
            data: { name, email, password: hashedPassword, role: data.role },
        });

        return { success: true };
    } catch (error) {
        console.error("Signup error:", error);
        return { success: false, error: "Failed to create account. Please try again." };
    }
}


export async function getDestinations() {
    try {
        const destinations = await prisma.destination.findMany({
            orderBy: { rating: 'desc' }
        });
        return destinations;
    } catch (error) {
        console.error("Error fetching destinations:", error);
        return [];
    }
}

export async function getDestinationById(id: string) {
    try {
        return await prisma.destination.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Error fetching destination:", error);
        return null;
    }
}

export async function createBooking(userId: string, destinationId: string, startDate: Date, endDate: Date, totalPrice: number) {
    try {
        const booking = await prisma.booking.create({
            data: {
                userId,
                destinationId,
                startDate,
                endDate,
                totalPrice,
                status: "confirmed"
            }
        });
        return { success: true, booking };
    } catch (error) {
        console.error("Error creating booking:", error);
        return { success: false, error: "Failed to book destination." };
    }
}
