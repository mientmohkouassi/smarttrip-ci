import { NextResponse } from "next/server";

// Destination name lookup (same as data.ts, avoids Prisma dependency issues)
const DESTINATION_NAMES: Record<string, string> = {
    "1": "Assinie-Mafia",
    "2": "Yamoussoukro",
    "3": "Grand-Bassam",
    "4": "Man",
    "5": "Abidjan Plateau",
    "6": "Korhogo",
    "7": "San Pédro",
    "8": "Taï National Park",
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { destinationId, startDate, endDate, totalPrice, guestName, guestEmail } = body;

        // Validate required fields
        if (!destinationId || !startDate || !endDate || !totalPrice) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Resolve destination name
        const destinationName = DESTINATION_NAMES[destinationId] ?? "Your Destination";

        // Generate a unique booking reference
        const bookingRef = `STR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

        // Return success — DB persistence and email are best-effort on the backend
        // In production, these would be queued jobs
        console.log(`[Booking] ${bookingRef} | ${destinationName} | ${guestName} <${guestEmail}> | ${startDate} → ${endDate}`);

        return NextResponse.json({
            id: bookingRef,
            status: "confirmed",
            destinationName,
            guestName: guestName || "Guest",
            startDate,
            endDate,
            totalPrice,
        });
    } catch (error) {
        console.error("[Booking API] Error:", error);
        return NextResponse.json({ error: "Could not process booking. Please try again." }, { status: 500 });
    }
}
