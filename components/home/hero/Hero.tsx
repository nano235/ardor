"use client";

import React from "react";
import styles from "./Hero.module.scss";
import { Title } from "@/shared";
import { useAppAssets } from "@/hooks/useLoading";
import { useGlobalContext } from "@/context/AppContext";
const Hero = () => {
	const { useGetGeneral } = useAppAssets();
	const { data: general } = useGetGeneral();
	const { isPageLoaded } = useGlobalContext();
	return (
		<section className={styles.hero}>
			<div className={styles.container}>
				<div className={styles.block_1} data-is-page-loaded={isPageLoaded}>
					<Title
						className={styles.title}
						title="We Create Captivating Videos"
					/>
				</div>
				<div className={styles.block_2} data-is-page-loaded={isPageLoaded}>
					<Title className={styles.title} title="That Drives Results" />
				</div>
				<div className={styles.video} data-is-page-loaded={isPageLoaded}>
					<video
						src={general?.data?.demo || "https://www.youtube.com"}
						autoPlay
						muted
						loop
						playsInline
					/>
				</div>
			</div>
		</section>
	);
};

export default Hero;
