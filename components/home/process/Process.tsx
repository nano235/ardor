"use client";

import React, { useState } from "react";
import styles from "./Process.module.scss";
import { Accordion, CustomLink, Slider, Title } from "@/shared";

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
	return (
		<div className={styles.process}>
			<div className={styles.container}>
				<div className={styles.block}>
					<Title
						subTitle="Our Processes"
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
				</div>
				<div className={styles.reel}></div>
				<div className={styles.mob_block}>
					<Title
						subTitle="Our Processes"
						title="Our Creative Process – Tailored for Your Video Needs"
						className={styles.title}
					/>
					<Slider sliders={processes} className={styles.slider} />
				</div>
				<div className={styles.mob_link_container}>
					<CustomLink href="/projects" label="Let's work together" />
				</div>
			</div>
		</div>
	);
};

export default Process;
