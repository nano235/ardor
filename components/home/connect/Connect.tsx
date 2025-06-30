"use client";

import React from "react";
import styles from "./Connect.module.scss";
import Title from "@/shared/title/Title";
import { CustomLink } from "@/shared";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const Connect = () => {
	const mainRef = useRef<HTMLDivElement>(null);

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

	const rawYButton = useTransform(scrollYProgress, [0.3, 0.6], [200, 0]);
	const yButton = useSpring(rawYButton, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacityButton = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
	const opacityButton = useSpring(rawOpacityButton, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	return (
		<div className={styles.connect} ref={mainRef}>
			<motion.div style={{ y, opacity }}>
				<Title
					title="Ready to bring your ideas to life?"
					description=" Let’s craft stunning motion designs that captivate and convert."
					className={styles.title}
				/>
			</motion.div>
			<motion.div
				className={styles.link_container}
				style={{ y: yButton, opacity: opacityButton }}
			>
				<CustomLink href="/contact" label="Let’s Work Together" />
			</motion.div>
		</div>
	);
};

export default Connect;
