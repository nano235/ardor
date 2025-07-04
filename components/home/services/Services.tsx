"use client";

import React, { useRef } from "react";
import styles from "./Services.module.scss";
import { Title, CustomLink } from "@/shared";
import { useMedia } from "@/mock/media.mock";
import Image from "next/image";
import { shortenTitle } from "@/utils/stringShortner copy";
import { useRouter } from "next/navigation";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";

export interface Card {
	title: string;
	description: string;
	image: { src: string; alt: string };
	icon: string;
	link: string;
}

const Services = () => {
	const router = useRouter();
	const mainRef = useRef(null);

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
	// Track scroll position relative to the section
	const { scrollYProgress } = useScroll({
		target: mainRef,
		offset: ["start end", "end end"]
	});

	// Transform values
	const rawY = useTransform(scrollYProgress, [0, 0.2], [300, 0]);
	const y = useSpring(rawY, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
	const opacity = useSpring(rawOpacity, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});

	return (
		<div className={styles.services} ref={mainRef}>
			<div className={styles.container}>
				<motion.div className={styles.row} style={{ y, opacity }}>
					<Title
						className={styles.title}
						subTitle="OUR SERVICES"
						title="Bring Your Vision to Life with Our Expert Video Services"
					/>

					<div className={styles.text}>
						<p>
							Whether it’s a product demo or a punchy promo, we turn your
							ideas into videos that connect with people and drives result
						</p>
						<CustomLink href="/services" label="See All Services" />
					</div>
				</motion.div>

				<div className={styles.grid}>
					{cards.map((card, index) => {
						// const { y, opacity } = getCardTransform(index);
						return (
							<Card
								card={card}
								index={index}
								key={index}
								router={router}
								scrollYProgress={scrollYProgress}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Services;

interface CardProps {
	card: Card;
	index: number;
	scrollYProgress: MotionValue<number>;
	router: ReturnType<typeof useRouter>;
}

const Card = ({ card, index, scrollYProgress, router }: CardProps) => {
	const start = 0 + index * 0.2;
	const end = start + 0.3;
	const rawY = useTransform(scrollYProgress, [start, end], [400, 0]);
	const y = useSpring(rawY, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
	const opacity = useSpring(rawOpacity, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	return (
		<motion.div
			className={styles.card_container}
			key={index}
			style={{ y, opacity }}
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
						playsInline
					></video>
				</div>
				<div className={styles.background}>
					<div className={styles.icon_container}>
						<div className={styles.icon}>
							<Image src={card.icon} alt={card.title} fill />
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
		</motion.div>
	);
};
