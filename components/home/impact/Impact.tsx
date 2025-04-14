import React from "react";
import styles from "./Impact.module.scss";
import Title from "@/shared/title/Title";
import CustomLink from "@/shared/customLink/CustomLink";
import Image from "next/image";

const impacts = [
	{
		id: 1,
		title: "High-Quality, Engaging Content ",
		description:
			"We craft visually stunning videos that captivate audiences and drive engagement.",
		icon: "/svgs/star.svg"
	},
	{
		id: 2,
		title: "Fast Turnaround Time",
		description:
			" Get professionally edited videos quickly, without compromising creativity.",
		icon: "/svgs/flash.svg"
	},
	{
		id: 3,
		title: "Tailored for Your Brand",
		description:
			"Every video is customized to match your brand’s unique style, voice, and goals.",
		icon: "/svgs/brush-2.svg"
	},
	{
		id: 4,
		title: "Designed for Maximum Impact",
		description:
			"Our videos are optimized for social media, ads, and websites to boost engagement and conversions.",
		icon: "/svgs/chart-square.svg"
	}
];

const Impact = () => {
	return (
		<div className={styles.impact}>
			<div className={styles.container}>
				<div className={styles.row}>
					<Title
						title="Creating Impact, Not Just Videos"
						description="Our videos do more than look great—they engage, inspire, and deliver results."
					/>
					<div className={styles.link_container}>
						<CustomLink href="/projects" label="Let's work together" />
					</div>
				</div>
				<div className={styles.grid}>
					{impacts.map(impact => (
						<div className={styles.card} key={impact.id}>
							<div className={styles.icon}>
								<Image src={impact.icon} alt={impact.title} fill />
							</div>
							<div className={styles.details}>
								<h3>{impact.title}</h3>
								<p>{impact.description}</p>
							</div>
						</div>
					))}
				</div>
				<div className={styles.mob_link_container}>
					<CustomLink href="/projects" label="Let's work together" />
				</div>
			</div>
		</div>
	);
};

export default Impact;
