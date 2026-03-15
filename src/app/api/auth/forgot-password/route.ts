import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();
        
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ 
            where: { email: email.toLowerCase().trim() } 
        });

        // OWASP: Don't reveal if user exists
        if (!user) {
            return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        await prisma.user.update({
            where: { id: user.id },
            data: { resetToken, resetTokenExpiry },
        });

        const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/reset-password?token=${resetToken}`;

        // Only send email if API key exists
        if (process.env.RESEND_API_KEY) {
            await resend.emails.send({
                from: "SmartTrip CI <onboarding@resend.dev>", // Default Resend test domain
                to: [user.email!],
                subject: "Reset your SmartTrip CI password",
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #f97316;">Reset Your Password</h2>
                        <p>We received a request to reset your password for SmartTrip CI. Click the button below to proceed:</p>
                        <a href="${resetUrl}" style="display: inline-block; background-color: #f97316; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0;">Reset Password</a>
                        <p>This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                        <p style="color: #666; font-size: 12px;">SmartTrip CI — Exploring Côte d'Ivoire</p>
                    </div>
                `,
            });
        } else {
            console.log("RESEND_API_KEY not found. Reset URL:", resetUrl);
        }

        return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
