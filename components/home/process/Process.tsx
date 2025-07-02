"use client";

import React, { useRef, useState } from "react";
import styles from "./Process.module.scss";
import { Accordion, CustomLink, Slider, Title } from "@/shared";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import { useAppAssets } from "@/hooks/useLoading";
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
	const { useGetGeneral } = useAppAssets();
	const { data: general } = useGetGeneral();
	const [activeAccordion, setActiveAccordion] = useState<string | number | null>(null);
	const handleToggle = (id: string | number) => {
		setActiveAccordion(activeAccordion === id ? null : id);
	};
	const mainRef = useRef<HTMLDivElement>(null);

	const videos = [
		{
			id: 1,
			src: general?.data.discovery
		},
		{
			id: 2,
			src: general?.data.script
		},
		{
			id: 3,
			src: general?.data.design
		},
		{
			id: 4,
			src: general?.data.expert
		},
		{
			id: 5,
			src: general?.data.sound
		},
		{
			id: 6,
			src: general?.data.delivery
		}
	];

	const displayedVideo = () => {
		const _video = videos.find(video => video.id === activeAccordion);
		return _video;
	};

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
				>
					<video
						src={
							displayedVideo()?.src ||
							general?.data.discovery ||
							"https://www.youtube.com"
						}
						autoPlay
						muted
						loop
						style={{ width: "100%", height: "100%" }}
					/>
				</motion.div>
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
