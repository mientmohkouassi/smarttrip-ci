import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();
        const body = await req.json();
        const { destinationId, startDate, endDate, totalPrice, guestName, guestEmail } = body;

        if (!destinationId || !startDate || !endDate) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Resolve destination from database
        const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
        if (!destination) {
            return NextResponse.json({ error: "Destination not found" }, { status: 404 });
        }

        // If a user is logged in, save the booking to the DB linked to their account
        let bookingId: string;

        if (session?.user?.id) {
            const booking = await prisma.booking.create({
                data: {
                    userId: (session.user as any).id,
                    destinationId,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    totalPrice: destination.price, // OWASP A01: Trust DB price, not client
                    status: "confirmed",
                },
            });
            bookingId = booking.id;
        } else {
            // Guest booking — generate a reference without DB (no userId available)
            bookingId = `STR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
        }

        // OWASP A09: Avoid logging PII like email/full names in production logs
        console.log(`[Booking] ${bookingId} | ${destination.name}`);

        return NextResponse.json({
            id: bookingId,
            status: "confirmed",
            destinationName: destination.name,
            guestName: guestName || "Guest",
            startDate,
            endDate,
            totalPrice: destination.price,
        });
    } catch (error) {
        console.error("[Booking API] Error:", error);
        return NextResponse.json({ error: "Could not process booking. Please try again." }, { status: 500 });
    }
}
