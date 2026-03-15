import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DEBUG ONLY — Remove before going to production
export async function GET(request: Request) {
    const url = new URL(request.url);
    const email = url.searchParams.get("email") ?? "";

    try {
        const count = await prisma.user.count();
        let userCheck = null;
        if (email) {
            userCheck = await prisma.user.findUnique({
                where: { email: email.toLowerCase().trim() },
                select: { id: true, email: true, role: true }
            });
        }

        return NextResponse.json({
            totalUsers: count,
            emailQueried: email || "(none)",
            userFound: userCheck,
            message: userCheck
                ? "⚠️ User EXISTS in database"
                : count === 0
                    ? "✅ Database is completely empty"
                    : "❓ User not found but other users exist"
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
