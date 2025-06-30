"use client";

import React, { useRef } from "react";
import styles from "./Slides.module.scss";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const slides = [
	{
		src: "/images/albantsho.png",
		alt: "Albantsho"
	},
	{
		src: "/images/Filmmakers.png",
		alt: "Filmmakers"
	},
	{
		src: "/images/Prime.png",
		alt: "Prime"
	},
	{
		src: "/images/showmax.png",
		alt: "showmax"
	},
	{
		src: "/images/Multichoice.png",
		alt: "Multichoice"
	},
	{
		src: "/images/Natives.png",
		alt: "Natives"
	}
];

const Slides = () => {
	const mainRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: mainRef,
		offset: ["start end", "end center"]
	});

	const rawY = useTransform(scrollYProgress, [0, 1], [300, 0]);
	const y = useSpring(rawY, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
	const opacity = useSpring(rawOpacity, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	return (
		<div ref={mainRef}>
			<motion.div className={styles.slides} style={{ y, opacity }}>
				{[...slides, ...slides, ...slides].map((item, index) => (
					<div key={index} className={styles.slide} data-type={item.alt}>
						<Image
							quality={100}
							priority
							src={item.src}
							alt={item.alt}
							fill
						/>
					</div>
				))}
			</motion.div>
		</div>
	);
};

export default Slides;
