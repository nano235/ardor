import React from "react";
import styles from "./Hero.module.scss";
import { Title } from "@/shared";

const Hero = () => {
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<Title className={styles.title} title="We Create Captivating Videos" />
				<Title className={styles.title} title="That Drives Results" />
				<div className={styles.video}>
					<video
						src="https://res.cloudinary.com/dlq93g9xz/video/upload/v1743259889/Ardors_Demo_Reel_coy9zr.mp4"
						autoPlay
						muted
						loop
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
