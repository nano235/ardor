"use client";

import React, { useState } from "react";
import styles from "./BestWork.module.scss";
import { CustomLink, Title } from "@/shared";

export const categories = [
	{
		id: 1,
		title: "All Projects"
	},
	{
		id: 2,
		title: "Branding Projects"
	},
	{
		id: 3,
		title: "Motion Projects"
	},
	{
		id: 4,
		title: "Print Projects"
	},
	{
		id: 5,
		title: "Web Projects"
	},
	{
		id: 6,
		title: "Illustration Projects"
	},
	{
		id: 7,
		title: "Packaging Projects"
	},
	{
		id: 8,
		title: "Product Projects"
	},
	{
		id: 9,
		title: "Social Projects"
	},
	{
		id: 10,
		title: "Digital Projects"
	}
];

const BestWork = () => {
	const [activeCategory, setActiveCategory] = useState(categories[0]);
	return (
		<div className={styles.bestWork}>
			<div className={styles.container}>
				<Title
					className={styles.title}
					title="Explore Some Of Our Best Work"
					subTitle="Projects"
					description="From concept to motion, we turn ideas into visually stunning videos that leave an impact."
				/>
				<div className={styles.categories}>
					{categories.map(category => (
						<div
							key={category.id}
							className={styles.category}
							data-active={activeCategory.id === category.id}
							onClick={() => setActiveCategory(category)}
						>
							{category.title}
						</div>
					))}
				</div>
				<div className={styles.grid}>
					{Array.from({ length: 6 }).map((_, index) => (
						<div className={styles.card} key={index}>
							<div className={styles.reel}></div>
							<div className={styles.text}>
								<h3>{activeCategory.title}</h3>
							</div>
						</div>
					))}
				</div>
				<div className={styles.link_container}>
					<CustomLink href="/projects" label="See All Projects" />
				</div>
			</div>
		</div>
	);
};

export default BestWork;
