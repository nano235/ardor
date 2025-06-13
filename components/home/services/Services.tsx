"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Services.module.scss";
import { Title, CustomLink, Button } from "@/shared";
import { media } from "@/mock/media.mock";
import Image from "next/image";
import { shortenTitle } from "@/utils/stringShortner copy";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export const cards = [
	{
		title: "Promotion Videos",
		description: "We create high-impact videos that boost awareness and sales.",
		image: media.promotionVideo,
		icon: "/svgs/promotion.svg",
		link: "/learn-more?service=promotion-videos"
	},
	{
		title: "Social Media Video Editing",
		description: "We create high-impact videos that boost awareness and sales.",
		image: media.socialMedia,
		icon: "/svgs/video.svg",
		link: "/learn-more?service=social-media-video-editing"
	},
	{
		title: "Product Demo",
		description: "We create high-impact videos that boost awareness and sales.",
		image: media.productDemo,
		icon: "/svgs/product.svg",
		link: "/learn-more?service=product-demo"
	},
	{
		title: "Brand Animation",
		description: "We create high-impact videos that boost awareness and sales.",
		image: media.brandAnimation,
		icon: "/svgs/brand.svg",
		link: "/learn-more?service=brand-animation"
	}
];

const Services = () => {
	const router = useRouter();
	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = mainRef.current;
		const title = container?.querySelector(`.${styles.title}`) as HTMLElement;
		const text = container?.querySelector(`.${styles.text}`) as HTMLElement;
		const cards = container?.querySelectorAll(
			`.${styles.card_container}`
		) as NodeListOf<HTMLElement>;
		if (container) {
			const animation = gsap.fromTo(
				[title, text, ...cards],
				{
					y: 500
				},
				{
					y: 0,
					ease: "none",
					stagger: 1,
					// duration: 1.5,
					scrollTrigger: {
						trigger: container,
						start: "top bottom",
						end: "center center-=100px",
						scrub: 1.5
					}
				}
			);
			return () => {
				animation.kill();
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			};
		}
	}, []);

	return (
		<div className={styles.services} ref={mainRef}>
			<div className={styles.container}>
				<div className={styles.row}>
					<Title
						className={styles.title}
						subTitle="OUR SERVICES"
						title="Bring Your Vision to Life with Our Expert Video Services"
					/>
					<div className={styles.text}>
						<p>
							From product demos to promotional videos, we craft
							high-quality motion design and video edits that engage your
							audience and elevate your brand
						</p>
						<CustomLink href="/services" label="See All Services" />
					</div>
				</div>
				<div className={styles.grid}>
					{cards.map((card, index) => (
						<div className={styles.card_container} key={index}>
							<div
								className={styles.card}
								style={{
									backgroundImage: `url(${card.image.src})`
								}}
							>
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
									<Button
										className={styles.button}
										onClick={() => router.push(card.link)}
									>
										Learn More
									</Button>
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

export default Services;

// "use client";

// import React, { useRef } from "react";
// import styles from "./Services.module.scss";
// import { Title, CustomLink, Button } from "@/shared";
// import { media } from "@/mock/media.mock";
// import Image from "next/image";
// import { shortenTitle } from "@/utils/stringShortner copy";
// import { useRouter } from "next/navigation";
// import { motion, useScroll, useTransform } from "framer-motion";

// export const cards = [
// 	{
// 		title: "Promotion Videos",
// 		description: "We create high-impact videos that boost awareness and sales.",
// 		image: media.promotionVideo,
// 		icon: "/svgs/promotion.svg",
// 		link: "/learn-more?service=promotion-videos"
// 	},
// 	{
// 		title: "Social Media Video Editing",
// 		description: "We create high-impact videos that boost awareness and sales.",
// 		image: media.socialMedia,
// 		icon: "/svgs/video.svg",
// 		link: "/learn-more?service=social-media-video-editing"
// 	},
// 	{
// 		title: "Product Demo",
// 		description: "We create high-impact videos that boost awareness and sales.",
// 		image: media.productDemo,
// 		icon: "/svgs/product.svg",
// 		link: "/learn-more?service=product-demo"
// 	},
// 	{
// 		title: "Brand Animation",
// 		description: "We create high-impact videos that boost awareness and sales.",
// 		image: media.brandAnimation,
// 		icon: "/svgs/brand.svg",
// 		link: "/learn-more?service=brand-animation"
// 	}
// ];

// const Services = () => {
// 	const router = useRouter();
// 	const mainRef = useRef(null);

// 	// Track scroll position relative to the section
// 	const { scrollYProgress } = useScroll({
// 		target: mainRef,
// 		offset: ["start end", "center center"]
// 	});

// 	// Transform values
// 	const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
// 	const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

// 	// For staggered cards, we'll use delay based on index
// 	const getCardTransform = (index: number) => {
// 		const start = 0 + index * 0.1;
// 		const end = start + 0.3;
// 		return {
// 			y: useTransform(scrollYProgress, [start, end], [50, 0]),
// 			opacity: useTransform(scrollYProgress, [start, end], [0, 1])
// 		};
// 	};

// 	return (
// 		<div className={styles.services} ref={mainRef}>
// 			<div className={styles.container}>
// 				<div className={styles.row}>
// 					<motion.div style={{ y, opacity }}>
// 						<Title
// 							className={styles.title}
// 							subTitle="OUR SERVICES"
// 							title="Bring Your Vision to Life with Our Expert Video Services"
// 						/>
// 					</motion.div>

// 					<motion.div className={styles.text} style={{ y, opacity }}>
// 						<p>
// 							From product demos to promotional videos, we craft
// 							high-quality motion design and video edits that engage your
// 							audience and elevate your brand
// 						</p>
// 						<CustomLink href="/services" label="See All Services" />
// 					</motion.div>
// 				</div>

// 				<div className={styles.grid}>
// 					{cards.map((card, index) => {
// 						const { y, opacity } = getCardTransform(index);
// 						return (
// 							<motion.div
// 								className={styles.card_container}
// 								key={index}
// 								style={{ y, opacity }}
// 							>
// 								<div
// 									className={styles.card}
// 									style={{
// 										backgroundImage: `url(${card.image.src})`
// 									}}
// 								>
// 									<div className={styles.background}>
// 										<div className={styles.icon_container}>
// 											<div className={styles.icon}>
// 												<Image
// 													src={card.icon}
// 													alt={card.title}
// 													fill
// 												/>
// 											</div>
// 										</div>
// 										<div className={styles.text}>
// 											<h3>{card.title}</h3>
// 											<p>{card.description}</p>
// 										</div>
// 										<Button
// 											className={styles.button}
// 											onClick={() => router.push(card.link)}
// 										>
// 											Learn More
// 										</Button>
// 									</div>
// 								</div>

// 								<div className={styles.card_mobile}>
// 									<div className={styles.text}>
// 										<h3>{shortenTitle(card.title, 17)}</h3>
// 										<p>{card.description}</p>
// 									</div>
// 								</div>
// 							</motion.div>
// 						);
// 					})}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Services;
