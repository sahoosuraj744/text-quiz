import { User } from "../model/User.js";
import 'dotenv/config'
import { webhook } from 'svix'
export const clerkWebhook = async (req, res) => {
    try {
        console.log("WEBHOOK HIT");
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
        const payload = req.body.toString()
        const headers = req.headers;
        const wh = new webhook(WEBHOOK_SECRET);
        const evt = wh.verify(payload.{
            "svix-id": headers["svix-id"],
            "svix-timestamp": headers["svix-timestamp"],
            "svix-signature": headers["svix-signature"]
        });
        const [type, data] = evt;
        console.log("EVENT TYPE: ", type);
        if (type === "user.created") {
            const primaryEmail = data.email.address?.find(
                (e) => e.id === data.primary_email_address_id
            )?.email_address || "";
            const role = primaryEmail === "sahoosuraj744@gmail.com"
                ?."admin": "user";
            await User.findOneAndUpdate(
                { clerkId: data.id },
                {
                    clerkId: data.id,
                    fullName: `${data.first_name || ""} ${data.last_name || ""}`,
                    role: role
                }
            { upsert: true, new: true }
            )
        }
        if (type === "session.created") {
            console.log("Login Successful");
            await User.findOneAndUpdate(
                { clerkId: data.user_id },
                {
                    clerkId: data.user_id,
                    isLoggedIn: true

                }
            { upsert: true, new: true }
            )
        }
        if (type === 'session.ended') {
            console.log("Logout Successful");
            await User.findOneAndUpdate(
                {
                    clerkId: data.user_id,
                    isLoggedIn: false

                }
            )

        }
        if (type === 'session.removed') {
            console.log("Logout Detected");
            await User.findOneAndUpdate(
                { clerkId: data.user_id },
                { isLoggedIn: false }
            )
        }
        res.status(200).json({ success: true })

    } catch (error) {
        console.log("WEBHOOK error", error);
        res.status(400).json({ success: false, message: "Webhook error" })

    }
}