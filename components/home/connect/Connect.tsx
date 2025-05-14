"use client";

import React from "react";
import styles from "./Connect.module.scss";
import Title from "@/shared/title/Title";
import { CustomLink } from "@/shared";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Connect = () => {
	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = mainRef.current;
		const title = container?.querySelector(`.${styles.title}`) as HTMLElement;
		const linkContainer = container?.querySelector(
			`.${styles.link_container}`
		) as HTMLElement;
		if (container && window.innerWidth > 485) {
			const animation = gsap.fromTo(
				[title, linkContainer],
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
						start: "top bottom-=100px",
						end: "center center-=300px",
						scrub: 1.5
					}
				}
			);
			return () => {
				animation.kill();
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			};
		}
		if (container && window.innerWidth < 485) {
			const animation = gsap.fromTo(
				[title, linkContainer],
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
						start: "top bottom-=1000px",
						end: "bottom top-=600px",
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
		<div className={styles.connect} ref={mainRef}>
			<Title
				title="Ready to bring your ideas to life?"
				description=" Let’s craft stunning motion designs that captivate and convert."
				className={styles.title}
			/>
			<div className={styles.link_container}>
				<CustomLink href="/contact" label="Let’s Work Together" />
			</div>
		</div>
	);
};

export default Connect;
