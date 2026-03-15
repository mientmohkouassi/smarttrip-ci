import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { resetToken: token },
        });

        if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
            return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
        }

        // Hash new password - using cost factor 12 to match signup
        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        return NextResponse.json({ message: "Password reset successful" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
