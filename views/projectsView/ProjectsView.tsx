"use client";

import React, { useState } from "react";
import styles from "./ProjectsView.module.scss";
import { Title } from "@/shared";
import { categories } from "@/components/home/bestWork/BestWork";
import Image from "next/image";

const ProjectsView = () => {
	const [activeCategory, setActiveCategory] = useState(categories[0]);
	return (
		<div className={styles.projects}>
			<div className={styles.container}>
				<div className={styles.row}>
					<Title
						title="Explore Some Of Our Best Work"
						className={styles.title}
					/>
					<div className={styles.text}>
						<h6>
							Discover our standout projects, crafted to inspire, engage,
							and bring ideas to life with stunning motion design. From
							concept to motion, we turn ideas into visually stunning videos
							that leave an impact.
						</h6>
					</div>
				</div>
				<div className={styles.main}>
					<Image src="/images/demo.png" alt="projects" fill />
				</div>
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
			</div>
		</div>
	);
};

export default ProjectsView;
