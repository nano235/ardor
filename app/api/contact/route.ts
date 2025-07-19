import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
	const body = await req.json();

	const { name, email, message } = body;

	try {
		await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
			service_id: process.env.EMAILJS_SERVICE_ID,
			template_id: process.env.EMAILJS_TEMPLATE_ID,
			user_id: process.env.EMAILJS_PUBLIC_KEY,
			template_params: {
				from_name: name,
				from_email: email,
				message
			}
		});

		return NextResponse.json({ success: true });
	} catch (error: unknown) {
		if (
			error &&
			typeof error === "object" &&
			"response" in error &&
			error.response &&
			typeof error.response === "object" &&
			"data" in (error.response as Record<string, unknown>)
		) {
			console.error(
				"Email send error:",
				(error.response as { data?: unknown }).data
			);
		} else {
			console.error("Email send error:", (error as Error).message);
		}
		return NextResponse.json(
			{ success: false, error: "Failed to send email" },
			{ status: 500 }
		);
	}
}
