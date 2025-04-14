"use client";

import { Title } from "@/shared";
import styles from "./LearnMoreView.module.scss";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

enum Queries {
	PromotionVideos = "promotion-videos",
	SocialMediaVideoEditing = "social-media-video-editing",
	ProductDemo = "product-demo",
	BrandAnimation = "brand-animation"
}

const nav = [
	{
		title: "Promotion videos",
		subTitle: "Where It Works Best",
		descriptions: [
			"A promotional video is designed to showcase your brand, product, or event in a compelling way. Short and dynamic, these videos highlight key selling points, build excitement, and persuade your audience to take action—whether it’s making a purchase, signing up, or attending an event.",
			"Promotional videos focus on emotional appeal, impactful storytelling, and strong visuals that align with your brand’s identity. They work well across social media, websites, and even in-store displays. Whether launching a new product or boosting brand awareness, these videos help maximize engagement and conversions."
		],
		list: [
			"Social Media Ads",
			"Website Landing Pages",
			"Digital Billboards & In-Store Screens"
		],
		link: Queries.PromotionVideos
	},
	{
		title: "Social Media Video Editing",
		subTitle: "Where It Works Best",
		descriptions: [
			"Social media is a competitive space, and high-quality videos make all the difference. We take raw footage and transform it into polished, engaging content that resonates with your audience. From jump cuts to color grading, effects, and pacing—every detail is optimized to hold viewers’ attention.",
			"Good editing doesn’t just enhance visuals; it strengthens storytelling, improves watch time, and increases engagement. Whether you’re a vlogger, educator, or brand, we make sure your content looks professional, feels seamless, and keeps your audience coming back for more."
		],
		list: ["YouTube Channels", "Social Media Platforms", "Online Courses & Webinars"],
		link: Queries.SocialMediaVideoEditing
	},
	{
		title: "Product Demo",
		subTitle: "Where It Works Best",
		descriptions: [
			"A product demo video highlights how a product works, its key features, and the benefits it offers. These videos help potential customers see the value of your product in action, making complex features easy to understand and demonstrating how it solves their problems.",
			"An effective product demo builds trust, boosts conversions, and enhances brand credibility. Whether launching a new product or simplifying an existing one, a well-crafted demo can be the difference between a hesitant viewer and a paying customer."
		],
		list: [
			"Website Product Pages",
			"E-commerce Listings",
			"Sales Presentations & Webinars"
		],
		link: Queries.ProductDemo
	},
	{
		title: "Brand Animation",
		subTitle: "Where It Works Best",
		descriptions: [
			"A logo animation adds movement and energy to your brand’s identity, making it more memorable and engaging. Unlike static logos, animated logos create a lasting impression, enhancing brand recognition and making your content feel more professional.",
			"From subtle motion to bold cinematic effects, logo animations can be tailored to fit your brand personality. Perfect for video intros, brand reveals, and digital marketing, an animated logo strengthens your visual identity and sets the tone for your brand."
		],
		list: [
			"Video Intros & Outros",
			"Website & App Splash Screens",
			"Social Media Branding"
		],
		link: Queries.BrandAnimation
	}
];
const LearnMoreView = () => {
	const searchParams = useSearchParams();
	const currentService = searchParams.get("service") || Queries.PromotionVideos;
	const router = useRouter();
	const pathname = usePathname();
	const handleService = (service: Queries) => {
		const current = new URLSearchParams(Array.from(searchParams.entries()));
		current.set("service", service);
		const search = current.toString();
		const query = search ? `?${search}` : "";

		router.push(`${pathname}${query}`);
	};
	const active = nav.findIndex(item => item.link === currentService);
	return (
		<div className={styles.learn}>
			<div className={styles.container}>
				<div className={styles.back}>
					<div className={styles.icon}>
						<Image src="/svgs/arrow-white.svg" alt="back" fill />
					</div>
					<p>Back</p>
				</div>
				<div className={styles.row}>
					<Title
						title="What We Create for Your Brand"
						className={styles.title}
					/>
					<div className={styles.text}>
						<h6>
							From visuals to motion, storytelling to sound, we craft
							compelling content. Here are some of our most sought-after
							motion design services.
						</h6>
					</div>
				</div>
				<div className={styles.block_row}>
					<div className={styles.nav}>
						{nav.map((item, index) => (
							<div
								className={styles.button}
								key={index}
								data-active={currentService === item.link}
								onClick={() => handleService(item.link)}
							>
								<p>{item.title}</p>
							</div>
						))}
					</div>
					<div className={styles.block}>
						<div className={styles.text}>
							<h2>{nav[active].title}</h2>
							{nav[active].descriptions.map((item, index) => (
								<p key={index}>{item}</p>
							))}
						</div>
						<div className={styles.text}>
							<h3>{nav[active].subTitle}</h3>
							<ul>
								{nav[active].list.map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						</div>
						<div className={styles.image}>
							<Image src="/images/demo.png" alt="image" fill />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LearnMoreView;
