"use client";

import React from "react";
import styles from "./Hero.module.scss";
import { Title } from "@/shared";
import { useGetGeneral } from "@/app/api/hooks/general";
const Hero = () => {
	const { data: general } = useGetGeneral();
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<Title className={styles.title} title="We Create Captivating Videos" />
				<Title className={styles.title} title="That Drives Results" />
				<div className={styles.video}>
					<video src={general?.data?.demo || ""} autoPlay muted loop />
				</div>
			</div>
		</section>
	);
};

export default Hero;
