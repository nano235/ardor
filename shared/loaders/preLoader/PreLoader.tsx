"use client";

import React from "react";
import styles from "./PreLoader.module.scss";
import { useGlobalContext } from "@/context/AppContext";
import Image from "next/image";
const PreLoader = () => {
	const { isPageLoaded } = useGlobalContext();
	return (
		<div className={styles.preLoader} data-is-page-loaded={isPageLoaded}>
			<div className={styles.title}>{/* <h1>ARDORS</h1> */}</div>
			<div className={styles.video}>
				<Image src="/ardors.gif" fill alt="" />
			</div>
			{/* <div className={styles.progress_container}>
				<div className={styles.text}>
					<h1>{progress}%</h1>
				</div>
				<div className={styles.progress}>
					<div
						className={styles.progressBar}
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div> */}
		</div>
	);
};

export default PreLoader;
