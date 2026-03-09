import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendBookingEmail = async (email: string, destinationName: string, bookingRef: string) => {
    try {
        await resend.emails.send({
            from: 'SmartTrip CI <notifications@smarttrip.ci>',
            to: email,
            subject: `Booking Confirmed: ${destinationName} 🎉`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
                    <h1 style="color: #f97316;">Your adventure is confirmed!</h1>
                    <p>Hi there,</p>
                    <p>We're excited to confirm your booking for <strong>${destinationName}</strong>.</p>
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 12px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 12px; text-transform: uppercase; color: #94a3b8; font-weight: bold;">Booking Reference</p>
                        <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: 800; color: #0f172a;">${bookingRef}</p>
                    </div>
                    <p>You can view your full itinerary and manage your trip on your <a href="${process.env.NEXTAUTH_URL}/dashboard" style="color: #f97316; font-weight: bold; text-decoration: none;">Traveler Dashboard</a>.</p>
                    <p>Safe travels!</p>
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #94a3b8;">SmartTrip CI — Discover the beauty of Ivory Coast</p>
                </div>
            `,
        });
        return { success: true };
    } catch (error) {
        console.error("Resend error:", error);
        return { success: false, error };
    }
};
