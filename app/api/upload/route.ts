// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import { promisify } from "util";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
	api_key: process.env.CLOUDINARY_API_KEY!,
	api_secret: process.env.CLOUDINARY_API_SECRET!
});

// const readFile = promisify(fs.readFile);

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const files = formData.getAll("file");

		if (files.length === 0) {
			return NextResponse.json(
				{ success: false, message: "No files uploaded" },
				{ status: 400 }
			);
		}

		const uploads = await Promise.all(
			files.map(async (file: unknown) => {
				// Create a temporary file path
				const bytes: ArrayBuffer = await (file as File).arrayBuffer();
				const buffer = Buffer.from(bytes);

				// Determine file type
				const mimetype = (file as File).type;
				const resourceType = mimetype.startsWith("video/") ? "video" : "image";
				const folder = resourceType === "video" ? "videos" : "images";

				// Create a temporary file
				const tempFilePath = join("/tmp", randomUUID());
				await writeFile(tempFilePath, buffer);

				// Upload to Cloudinary
				const result = await cloudinary.uploader.upload(tempFilePath, {
					resource_type: resourceType,
					folder
				});

				// Delete the temporary file
				fs.unlinkSync(tempFilePath);

				return {
					url: result.secure_url,
					public_id: result.public_id,
					resource_type: resourceType
				};
			})
		);

		return NextResponse.json({ success: true, uploads }, { status: 200 });
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json(
			{ success: false, message: "Upload failed" },
			{ status: 500 }
		);
	}
}
