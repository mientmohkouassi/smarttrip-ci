import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;

        const bookings = await prisma.booking.findMany({
            where: { userId },
            include: {
                destination: {
                    select: {
                        name: true,
                        image: true,
                        region: true,
                        rating: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("[User Bookings API] Error:", error);
        return NextResponse.json({ error: "Could not load bookings." }, { status: 500 });
    }
}
