import { Footer } from "@/shared";
import { Header } from "@/shared";
import { navLinks } from "@/mock";
import { PreLoader } from "@/shared/loaders";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
	title: "Ardors — Creative Motion Design & Video Editing",
	description:
		"We help brands captivate and convert through premium motion design and video editing. From launch videos to branded content — Ardors brings stories to life with style and clarity.",
	keywords:
		"creative video agency, explainer video production, animated brand videos, professional video editing, brand storytelling through motion, custom motion graphics, startup video marketing, product launch videos",
	openGraph: {
		title: "Ardors — Creative Motion Design & Video Editing",
		description:
			"We help brands captivate and convert through premium motion design and video editing. From launch videos to branded content — Ardors brings stories to life with style and clarity.",
		url: "https://ardors.co",
		siteName: "Ardors",
		images: [
			{
				url: "https://ardors.co/social-share.png",
				width: 1200,
				height: 630
			}
		],
		locale: "en_US",
		type: "website"
	},
	twitter: {
		card: "summary_large_image",
		title: "Ardors — Creative Motion Design & Video Editing",
		description:
			"We help brands captivate and convert through premium motion design and video editing. From launch videos to branded content — Ardors brings stories to life with style and clarity.",
		images: ["https://ardors.co/social-share.png"]
	}
};
export default function AppLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<Script
					src={`https://www.googletagmanager.com/gtag/js?id=G-9TJK8P7BEQ`}
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9TJK8P7BEQ');
          `}
				</Script>
			</head>
			<Header navLinks={navLinks} />
			<PreLoader />
			{children}
			<Footer />
		</html>
	);
}
