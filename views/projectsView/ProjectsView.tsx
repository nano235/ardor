"use client";

import React, { useState } from "react";
import styles from "./ProjectsView.module.scss";
import { Title } from "@/shared";
import { useGetArticleByCategory, useGetArticles } from "@/app/api/hooks/articles";
import { useGetCategories } from "@/app/api/hooks/categories";
import Image from "next/image";
import { PageLoader } from "@/shared/loaders";
import Link from "next/link";
import { IArticle } from "@/app/api/hooks/articles/types";

const ProjectsView = () => {
	const { data: articlesData, isFetching: isFetchingArticles } = useGetArticles();
	const { data: categoriesData } = useGetCategories();
	const categories = categoriesData?.data || [];
	const [activeCategory, setActiveCategory] = useState("all");
	const { data: filteredArticles, isFetching: isFetchingFilteredArticles } =
		useGetArticleByCategory(activeCategory === "all" ? "" : activeCategory);

	const articles =
		activeCategory === "all"
			? (articlesData?.data as IArticle[])
			: (filteredArticles?.data as IArticle[]);
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
				<div className={styles.categories}>
					<div
						className={styles.category}
						data-active={activeCategory === "all"}
						onClick={() => setActiveCategory("all")}
					>
						All Projects
					</div>
					{categories.map(category => (
						<div
							key={category._id}
							className={styles.category}
							data-active={activeCategory === category.slug}
							onClick={() => setActiveCategory(category.slug as string)}
						>
							{category.name}
						</div>
					))}
				</div>
				{isFetchingArticles || isFetchingFilteredArticles ? (
					<PageLoader />
				) : (
					<div className={styles.grid}>
						{articles?.map((article, index) => (
							<Link
								href={`/projects/${article.slug}`}
								className={styles.card}
								key={index}
							>
								{article.images && (
									<div className={styles.image}>
										<Image
											src={article.images[0]}
											alt={article.title as string}
											fill
										/>
									</div>
								)}
								<div className={styles.text}>
									<h3>{article.title}</h3>
								</div>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProjectsView;
