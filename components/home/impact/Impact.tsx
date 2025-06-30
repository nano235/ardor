"use client";

import React, { useRef } from "react";
import styles from "./Impact.module.scss";
import Title from "@/shared/title/Title";
import CustomLink from "@/shared/customLink/CustomLink";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScroll, useSpring, useTransform, motion, MotionValue } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

interface Card {
	id: number;
	title: string;
	description: string;
	icon: string;
}

const impacts: Card[] = [
	{
		id: 1,
		title: "High-Quality, Engaging Content ",
		description:
			"We craft visually stunning videos that captivate audiences and drive engagement.",
		icon: "/svgs/star.svg"
	},
	{
		id: 2,
		title: "Fast Turnaround Time",
		description:
			" Get professionally edited videos quickly, without compromising creativity.",
		icon: "/svgs/flash.svg"
	},
	{
		id: 3,
		title: "Tailored for Your Brand",
		description:
			"Every video is customized to match your brand’s unique style, voice, and goals.",
		icon: "/svgs/brush-2.svg"
	},
	{
		id: 4,
		title: "Designed for Maximum Impact",
		description:
			"Our videos are optimized for social media, ads, and websites to boost engagement and conversions.",
		icon: "/svgs/chart-square.svg"
	}
];

const Impact = () => {
	const mainRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: mainRef,
		offset: ["start end", "end center"]
	});

	const rawY = useTransform(scrollYProgress, [0, 0.3], [300, 0]);
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

	const rawX = useTransform(scrollYProgress, [0.2, 0.7], [700, 0]);
	const x = useSpring(rawX, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacityX = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
	const opacityX = useSpring(rawOpacityX, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});

	const rawYButton = useTransform(scrollYProgress, [0.7, 0.9], [200, 0]);
	const yButton = useSpring(rawYButton, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacityButton = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);
	const opacityButton = useSpring(rawOpacityButton, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	return (
		<div className={styles.impact} ref={mainRef}>
			<div className={styles.container}>
				<motion.div className={styles.row} style={{ y, opacity }}>
					<Title
						title="Creating Impact, Not Just Videos"
						description="Our videos do more than look great—they engage, inspire, and deliver results."
					/>
					<div className={styles.link_container}>
						<CustomLink href="/projects" label="Let's work together" />
					</div>
				</motion.div>
				<motion.div className={styles.grid} style={{ x, opacity: opacityX }}>
					{impacts.map((impact: Card) => (
						<div className={styles.card} key={impact.id}>
							<div className={styles.icon}>
								<Image src={impact.icon} alt={impact.title} fill />
							</div>
							<div className={styles.details}>
								<h3>{impact.title}</h3>
								<p>{impact.description}</p>
							</div>
						</div>
					))}
				</motion.div>
				<div className={styles.grid_mob}>
					{impacts.map((impact: Card, index: number) => (
						<Card
							impact={impact}
							index={index}
							key={index}
							scrollYProgress={scrollYProgress}
						/>
					))}
				</div>
				<motion.div
					className={styles.mob_link_container}
					style={{ y: yButton, opacity: opacityButton }}
				>
					<CustomLink href="/projects" label="Let's work together" />
				</motion.div>
			</div>
		</div>
	);
};

export default Impact;

interface CardProps {
	impact: Card;
	index: number;
	scrollYProgress: MotionValue<number>;
}

const Card = ({ impact, index, scrollYProgress }: CardProps) => {
	const start = 0 + index * 0.1;
	const end = start + 0.3;
	const rawY = useTransform(scrollYProgress, [start, end], [300, 0]);
	const y = useSpring(rawY, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});

	const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
	return (
		<motion.div className={styles.card} key={index} style={{ y, opacity }}>
			<div className={styles.icon}>
				<Image src={impact.icon} alt={impact.title} fill />
			</div>
			<div className={styles.details}>
				<h3>{impact.title}</h3>
				<p>{impact.description}</p>
			</div>
		</motion.div>
	);
};
