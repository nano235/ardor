import React from "react";
import styles from "./Slides.module.scss";
import Image from "next/image";

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
	return (
		<div className={styles.slides}>
			{[...slides, ...slides, ...slides].map((item, index) => (
				<div key={index} className={styles.slide} data-type={item.alt}>
					<Image quality={100} priority src={item.src} alt={item.alt} fill />
				</div>
			))}
		</div>
	);
};

export default Slides;
