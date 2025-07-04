"use client";

import React from "react";
import styles from "./ServicesView.module.scss";
import { Title } from "@/shared";
import Image from "next/image";
import { shortenTitle } from "@/utils/stringShortner copy";
import { useRouter } from "next/navigation";
import { useMedia } from "@/mock/media.mock";
import { Card } from "@/components/home/services/Services";

const ServicesView = () => {
	const router = useRouter();

	const { media } = useMedia();

	const cards: Card[] = [
		{
			title: "Promotion Videos",
			description:
				"Stand out from the noise with eye-catching visuals that drive awareness and get your audience excited about what you offer.",
			image: media.promotionVideo,
			icon: "/svgs/promotion.svg",
			link: "/learn-more?service=promotion-videos"
		},
		{
			title: "Social Media Video Editing",
			description:
				"Turn scrollers into followers with  platform-optimized videos that deliver your message fast and memorably.",
			image: media.socialMedia,
			icon: "/svgs/video.svg",
			link: "/learn-more?service=social-media-video-editing"
		},
		{
			title: "Product Demo",
			description:
				"Showcase your product in action with clean, clear, and captivating visuals",
			image: media.productDemo,
			icon: "/svgs/product.svg",
			link: "/learn-more?service=product-demo"
		},
		{
			title: "Brand Animation",
			description:
				"Add motion to your brand story with logo reveals, animated graphics, and visual storytelling",
			image: media.brandAnimation,
			icon: "/svgs/brand.svg",
			link: "/learn-more?service=brand-animation"
		}
	];
	return (
		<div className={styles.services}>
			<div className={styles.container}>
				<div className={styles.row}>
					<Title
						title="Bring Your Vision to Life with Our Expert Video Services"
						className={styles.title}
					/>
					<div className={styles.text}>
						<h6>
							From product demos to promotional videos, we craft
							high-quality motion design and video edits that engage your
							audience and elevate your brand
						</h6>
					</div>
				</div>
				<div className={styles.grid}>
					{cards.map((card, index) => (
						<div
							className={styles.card_container}
							key={index}
							onClick={() => router.push(card.link)}
						>
							<div
								className={styles.card}
								// style={{
								// 	backgroundImage: `url(${card.image.src})`
								// }}
							>
								<div className={styles.video_background}>
									<video
										src={card.image.src}
										style={{ width: "100%", height: "100%" }}
										autoPlay
										muted
										loop
									></video>
								</div>
								<div className={styles.background}>
									<div className={styles.icon_container}>
										<div className={styles.icon}>
											<Image
												src={card.icon}
												alt={card.title}
												fill
											/>
										</div>
									</div>
									<div className={styles.text}>
										<h3>{card.title}</h3>
										<p>{card.description}</p>
									</div>
									{/* <Button
										className={styles.button}
										onClick={() => router.push(card.link)}
									>
										Learn More
									</Button> */}
								</div>
							</div>
							<div className={styles.card_mobile}>
								<div className={styles.text}>
									<h3>{shortenTitle(card.title, 17)}</h3>
									<p>{card.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServicesView;
