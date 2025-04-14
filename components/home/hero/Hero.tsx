import React from "react";
import styles from "./Hero.module.scss";
import { Title } from "@/shared";

const Hero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<Title className={styles.title} title="We create captivating" />
				<Title className={styles.title} title="content that drives engagement" />
				<div className={styles.reel}></div>
			</div>
		</section>
	);
};

export default Hero;
