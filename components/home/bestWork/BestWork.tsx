"use client";

import React, { useState } from "react";
import styles from "./BestWork.module.scss";
import { CustomLink, Title } from "@/shared";
import { useGetArticleByCategory, useGetArticles } from "@/app/api/hooks/articles";
import { useGetCategories } from "@/app/api/hooks/categories";
import Image from "next/image";
import { PageLoader } from "@/shared/loaders";
import Link from "next/link";
import { IArticle } from "@/app/api/hooks/articles/types";
const BestWork = () => {
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
		<div className={styles.bestWork}>
			<div className={styles.container}>
				<Title
					className={styles.title}
					title="Explore Some Of Our Best Work"
					subTitle="Projects"
					description="From concept to motion, we turn ideas into visually stunning videos that leave an impact."
				/>
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
				<div className={styles.link_container}>
					<CustomLink href="/projects" label="See All Projects" />
				</div>
			</div>
		</div>
	);
};

export default BestWork;
