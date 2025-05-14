"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Impact.module.scss";
import Title from "@/shared/title/Title";
import CustomLink from "@/shared/customLink/CustomLink";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const impacts = [
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

	useEffect(() => {
		const container = mainRef.current;
		const row = container?.children[0].children[0] as HTMLElement;
		const grid = container?.children[0].children[1] as HTMLElement;
		const cards = container?.children[0].children[1]
			.childNodes as NodeListOf<HTMLElement>;
		const mobLinkContainer = container?.querySelector(
			`.${styles.mob_link_container}`
		) as HTMLElement;
		if (container && window.innerWidth > 485) {
			const animation = gsap.fromTo(
				[row],
				{
					y: 200
				},
				{
					y: 0,
					ease: "none",
					stagger: 0.2,
					// duration: 1.5,
					scrollTrigger: {
						trigger: container,
						start: "top center-=200px",
						end: "center center-=300px",
						scrub: 1.5
					}
				}
			);
			const animation2 = gsap.fromTo(
				[grid],
				{
					x: 500
				},
				{
					x: 0,
					ease: "none",
					stagger: 0.2,
					delay: 1,
					// duration: 1.5,
					scrollTrigger: {
						trigger: container,
						start: "center center",
						end: "bottom center-=500px",
						scrub: 1.5
					}
				}
			);
			return () => {
				animation.kill();
				animation2.kill();
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			};
		}
		if (container && window.innerWidth < 485) {
			const animation = gsap.fromTo(
				[row, ...cards, mobLinkContainer],
				{
					y: 500
				},
				{
					y: 0,
					ease: "none",
					stagger: 0.2,
					// duration: 1.5,
					scrollTrigger: {
						trigger: container,
						start: "top bottom-=1900px",
						end: "bottom top-=700px",
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
		<div className={styles.impact} ref={mainRef}>
			<div className={styles.container}>
				<div className={styles.row}>
					<Title
						title="Creating Impact, Not Just Videos"
						description="Our videos do more than look great—they engage, inspire, and deliver results."
					/>
					<div className={styles.link_container}>
						<CustomLink href="/projects" label="Let's work together" />
					</div>
				</div>
				<div className={styles.grid}>
					{impacts.map(impact => (
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
				</div>
				<div className={styles.mob_link_container}>
					<CustomLink href="/projects" label="Let's work together" />
				</div>
			</div>
		</div>
	);
};

export default Impact;
