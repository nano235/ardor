import React from "react";
import styles from "./Connect.module.scss";
import Title from "@/shared/title/Title";
import { CustomLink } from "@/shared";

const Connect = () => {
	return (
		<div className={styles.connect}>
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
