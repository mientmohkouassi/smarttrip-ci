import { Resend } from "resend";
import * as dotenv from "dotenv";

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
    console.log("Testing Resend with key:", process.env.RESEND_API_KEY?.substring(0, 10) + "...");
    
    try {
        const data = await resend.emails.send({
            from: "SmartTrip CI <onboarding@resend.dev>",
            to: ["mientmohfrejustekouassi@gmail.com"], // Your Resend sign-up email
            subject: "Resend Connectivity Test",
            html: "<strong>If you see this, your API key is working!</strong>"
        });

        console.log("RESEND SUCCESS:", data);
    } catch (error: any) {
        console.error("RESEND ERROR:", error);
    }
}

testEmail();
