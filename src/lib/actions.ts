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

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false, error: "An account with this email already exists." };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        // We can store partner details inside user profile or a separate profile table
        // For now, NextAuth and our schema doesn't have business fields so we'll just ignore or save them if we extend the schema.
        // Wait, schema.prisma doesn't have phone or business fields. We should just save name, email, password, role.
        const user = await prisma.user.create({
            data: {
                name: data.name.trim(),
                email,
                password: hashedPassword,
                role: data.role,
            },
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
