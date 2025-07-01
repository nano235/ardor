"use client";

import React, { useRef, useState } from "react";
import styles from "./Process.module.scss";
import { Accordion, CustomLink, Slider, Title } from "@/shared";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const processes = [
	{
		id: 1,
		title: "Discovery & Strategy",
		description:
			"We dive deep into your goals to create videos that boost engagement, increase sales, and strengthen your brand identity.",
		image: "/images/demo.png"
	},
	{
		id: 2,
		title: "Script & Concept Development",
		description:
			"We craft compelling narratives and engaging visuals that align with your brand and captivate your audience.",
		image: "/images/demo.png"
	},
	{
		id: 3,
		title: "Design & Storyboarding",
		description:
			"From logo animations to promotional videos, we create a visual roadmap to ensure a smooth and polished production.",
		image: "/images/demo.png"
	},
	{
		id: 4,
		title: "Expert Editing & Animation",
		description:
			"Our team brings your vision to life with high-quality motion design, seamless transitions, and eye-catching animation.",
		image: "/images/demo.png"
	},
	{
		id: 5,
		title: "Sound & Voiceover Integration",
		description:
			"We enhance storytelling with professional voiceovers and sound design that make your videos even more engaging.",
		image: "/images/demo.png"
	},
	{
		id: 6,
		title: "Final Delivery & Optimization",
		description:
			"Your video is delivered in high-resolution, platform-ready formats optimized for social media, websites, ads, and YouTube.",
		image: "/images/demo.png"
	}
];
const Process = () => {
	const [activeAccordion, setActiveAccordion] = useState<string | number | null>(null);
	const handleToggle = (id: string | number) => {
		setActiveAccordion(activeAccordion === id ? null : id);
	};
	const mainRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	const container = mainRef.current;
	// 	const block = container?.querySelector(`.${styles.block}`) as HTMLElement;
	// 	const reel = container?.querySelector(`.${styles.reel}`) as HTMLElement;
	// 	const mobBlock = container?.querySelector(`.${styles.mob_block}`) as HTMLElement;
	// 	const mobLinkContainer = container?.querySelector(
	// 		`.${styles.mob_link_container}`
	// 	) as HTMLElement;
	// 	if (container && window.innerWidth > 485) {
	// 		const animation = gsap.fromTo(
	// 			[block, reel],
	// 			{
	// 				y: 500
	// 			},
	// 			{
	// 				y: 0,
	// 				ease: "none",
	// 				stagger: 0.2,
	// 				// duration: 1.5,
	// 				scrollTrigger: {
	// 					trigger: container,
	// 					start: "top bottom",
	// 					end: "center center-=500px",
	// 					scrub: 1.5
	// 				}
	// 			}
	// 		);
	// 		return () => {
	// 			animation.kill();
	// 			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
	// 		};
	// 	}
	// 	if (container && window.innerWidth < 485) {
	// 		const animation = gsap.fromTo(
	// 			[...mobBlock.childNodes, mobLinkContainer],
	// 			{
	// 				y: 500
	// 			},
	// 			{
	// 				y: 0,
	// 				ease: "none",
	// 				stagger: 0.2,
	// 				// duration: 1.5,
	// 				scrollTrigger: {
	// 					trigger: container,
	// 					start: "top bottom-=1000px",
	// 					end: "bottom top-=600px",
	// 					scrub: 1.5
	// 				}
	// 			}
	// 		);
	// 		return () => {
	// 			animation.kill();
	// 			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
	// 		};
	// 	}
	// }, []);

	const { scrollYProgress } = useScroll({
		target: mainRef,
		offset: ["start end", "end center"]
	});

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

	const rawYReel = useTransform(scrollYProgress, [0, 0.5], [500, 0]);
	const yReel = useSpring(rawYReel, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacityReel = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
	const opacityReel = useSpring(rawOpacityReel, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	return (
		<div className={styles.process} ref={mainRef}>
			<div className={styles.container}>
				<motion.div className={styles.block} style={{ y, opacity }}>
					<Title
						subTitle="Our Process"
						title="Our Creative Process – Tailored for Your Video Needs"
					/>
					{processes.map(process => (
						<Accordion
							key={process.id}
							id={process.id}
							title={process.title}
							description={process.description}
							isActive={activeAccordion === process.id}
							onToggle={handleToggle}
						/>
					))}
					<div className={styles.link_container}>
						<CustomLink href="/projects" label="Let's work together" />
					</div>
				</motion.div>
				<motion.div
					className={styles.reel}
					style={{ y: yReel, opacity: opacityReel }}
				></motion.div>
				<div className={styles.mob_block}>
					<motion.div style={{ y, opacity }}>
						<Title
							subTitle="OUR PROCESS"
							title="Our Creative Process – Tailored for Your Video Needs"
							className={styles.title}
						/>
					</motion.div>
					<motion.div style={{ y: yReel, opacity: opacityReel }}>
						<Slider sliders={processes} className={styles.slider} />
					</motion.div>
				</div>
				<motion.div
					className={styles.mob_link_container}
					style={{ y: yReel, opacity: opacityReel }}
				>
					<CustomLink href="/projects" label="Let's work together" />
				</motion.div>
			</div>
		</div>
	);
};

export default Process;
