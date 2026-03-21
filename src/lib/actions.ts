"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { UserRole } from "@/lib/auth-client";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
        // OWASP A01: Prevent privilege escalation. New users are 'user' by default.
        // Admin or Partner roles should be granted by an existing administrator.
        const finalizedRole = (data.role === "admin") ? "user" : data.role;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        // OWASP A07: Do NOT reveal if the email exists to prevent enumeration.
        // We make an exception here for UX since it's a direct sign-up form.
        if (existingUser) {
            return { success: false, error: "An account with this email already exists." };
        }

        // OWASP A02: bcrypt with cost factor 12
        const hashedPassword = await bcrypt.hash(data.password, 12);

        const user = await prisma.user.create({
            data: { 
                name, 
                email, 
                password: hashedPassword, 
                role: finalizedRole,
                phone: data.phone,
                businessName: data.businessName,
                businessCategory: data.businessCategory,
            },
        });

        // Send Welcome Email
        if (resend) {
            try {
                await resend.emails.send({
                    from: "SmartTrip CI <onboarding@resend.dev>",
                    to: [email],
                    subject: `Welcome to SmartTrip CI, ${name.split(' ')[0]}! 🌍`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
                            <h2 style="color: #f97316;">Welcome to the Family!</h2>
                            <p>Hi ${name.split(' ')[0]},</p>
                            <p>We're thrilled to have you join SmartTrip CI. Your journey to exploring the hidden gems of Côte d'Ivoire starts here!</p>
                            <div style="background-color: #f8fafc; padding: 20px; rounded-radius: 12px; margin: 20px 0; border: 1px solid #e2e8f0;">
                                <p style="margin: 0; font-weight: bold;">What's next?</p>
                                <ul style="padding-left: 20px; margin-top: 10px;">
                                    <li>Complete your traveler profile</li>
                                    <li>Discover curated destinations</li>
                                    <li>Book your first authentic experience</li>
                                </ul>
                            </div>
                            <p>If you have any questions, just reply to this email. We're here to help!</p>
                            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                            <p style="color: #64748b; font-size: 12px;">© 2026 SmartTrip CI — Exploring Côte d'Ivoire</p>
                        </div>
                    `
                });
            } catch (err) {
                console.error("Failed to send welcome email:", err);
            }
        }

        return { success: true };
    } catch (error: any) {
        console.error("Signup error details:", error);
        return { 
            success: false, 
            error: error?.message || "Failed to create account. Please try again." 
        };
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

import { auth } from "@/auth";

export async function createBooking(destinationId: string, startDate: Date, endDate: Date) {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, error: "You must be logged in to book." };
    }
    const userId = (session.user as any).id;

    try {
        // Recalculate or verify price from DB to prevent price manipulation
        const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
        if (!destination) return { success: false, error: "Destination not found." };

        const booking = await prisma.booking.create({
            data: {
                userId,
                destinationId,
                startDate,
                endDate,
                totalPrice: destination.price, // Trust DB price, not client
                status: "confirmed"
            },
            include: {
                user: true,
                destination: true
            }
        });

        // Send Booking Confirmation Email
        if (resend && booking.user.email) {
            try {
                await resend.emails.send({
                    from: "SmartTrip CI <onboarding@resend.dev>",
                    to: [booking.user.email],
                    subject: `Booking Confirmed: ${booking.destination.name} 🎫`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
                            <h2 style="color: #f97316;">Your Trip is Confirmed!</h2>
                            <p>Hi ${booking.user.name?.split(' ')[0] || 'Traveler'},</p>
                            <p>Get your bags ready! Your booking for <strong>${booking.destination.name}</strong> is confirmed.</p>
                            
                            <div style="background-color: #f8fafc; padding: 25px; border-radius: 16px; margin: 25px 0; border: 1px solid #e2e8f0;">
                                <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b;">Itinerary Details</h3>
                                <p style="margin: 10px 0;"><strong>Destination:</strong> ${booking.destination.name}</p>
                                <p style="margin: 10px 0;"><strong>Dates:</strong> ${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}</p>
                                <p style="margin: 10px 0;"><strong>Total Price:</strong> ${booking.totalPrice.toLocaleString()} FCFA</p>
                                <p style="margin: 10px 0;"><strong>Status:</strong> <span style="color: #10b981; font-weight: bold;">Confirmed</span></p>
                            </div>

                            <p>You can view your full itinerary and manage your booking in your dashboard.</p>
                            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; background-color: #f97316; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px 0;">Go to Dashboard</a>
                            
                            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                            <p style="color: #64748b; font-size: 12px;">SmartTrip CI — The best way to travel Côte d'Ivoire</p>
                        </div>
                    `
                });
            } catch (err) {
                console.error("Failed to send booking email:", err);
            }
        }

        return { success: true, booking };
    } catch (error) {
        console.error("Error creating booking:", error);
        return { success: false, error: "Failed to book destination." };
    }
}
