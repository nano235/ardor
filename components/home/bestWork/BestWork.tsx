"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./BestWork.module.scss";
import { CustomLink, Title } from "@/shared";
import { useGetArticleByCategory, useGetArticles } from "@/app/api/hooks/articles";
import { useGetCategories } from "@/app/api/hooks/categories";
import Image from "next/image";
import { PageLoader } from "@/shared/loaders";
import Link from "next/link";
import { IArticle } from "@/app/api/hooks/articles/types";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BestWork = () => {
	const mainRef = useRef<HTMLDivElement>(null);
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

	useEffect(() => {
		const container = mainRef.current;
		const title = container?.querySelector(`.${styles.title}`) as HTMLElement;
		const categoriesArr = container?.querySelector(
			`.${styles.categories}`
		) as HTMLElement;
		const cards = container?.querySelectorAll(
			`.${styles.card}`
		) as NodeListOf<HTMLElement>;
		const button = container?.querySelector(
			`.${styles.link_container}`
		) as HTMLElement;

		if (
			container &&
			!isFetchingArticles &&
			articles?.length &&
			window.innerWidth > 485
		) {
			const animation = gsap.fromTo(
				[title, categoriesArr, ...cards, button],
				{
					y: 500
				},
				{
					y: 0,
					// ease: "none",
					stagger: 1,
					// duration: 1.5,
					scrollTrigger: {
						trigger: container,
						start: "top bottom",
						end: "center center-=200px",
						scrub: 1.5
					}
				}
			);

			// Clean up the animation when the component unmounts or the effect re-runs
			return () => {
				animation.kill();
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			};
		}
		if (
			container &&
			!isFetchingArticles &&
			articles?.length &&
			window.innerWidth < 485
		) {
			const animation = gsap.fromTo(
				[title, categoriesArr, ...cards, button],
				{
					y: 500
				},
				{
					y: 0,
					// ease: "none",
					stagger: 1,
					// duration: 1.5,
					scrollTrigger: {
						trigger: container,
						start: "top bottom",
						end: "bottom center+=300px",
						scrub: 1.5
					}
				}
			);

			// Clean up the animation when the component unmounts or the effect re-runs
			return () => {
				animation.kill();
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			};
		}
	}, [isFetchingArticles, articles?.length]);
	return (
		<div className={styles.bestWork} ref={mainRef}>
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
					{categories.slice(0, 6).map(category => (
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
