"use client";

import React, { useRef, useState } from "react";
import styles from "./BestWork.module.scss";
import { CustomLink, Title } from "@/shared";
import { useGetArticleByCategory, useGetArticles } from "@/app/api/hooks/articles";
import { useGetCategories } from "@/app/api/hooks/categories";
import Image from "next/image";
import { PageLoader } from "@/shared/loaders";
import { IArticle } from "@/app/api/hooks/articles/types";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

const BestWork = () => {
	const mainRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
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

	// useEffect(() => {
	// 	const container = mainRef.current;
	// 	const title = container?.querySelector(`.${styles.title}`) as HTMLElement;
	// 	const categoriesArr = container?.querySelector(
	// 		`.${styles.categories}`
	// 	) as HTMLElement;
	// 	const cards = container?.querySelectorAll(
	// 		`.${styles.card}`
	// 	) as NodeListOf<HTMLElement>;
	// 	const button = container?.querySelector(
	// 		`.${styles.link_container}`
	// 	) as HTMLElement;

	// 	if (
	// 		container &&
	// 		!isFetchingArticles &&
	// 		articles?.length &&
	// 		window.innerWidth > 485
	// 	) {
	// 		const animation = gsap.fromTo(
	// 			[title, categoriesArr, ...cards, button],
	// 			{
	// 				y: 500
	// 			},
	// 			{
	// 				y: 0,
	// 				// ease: "none",
	// 				stagger: 1,
	// 				// duration: 1.5,
	// 				scrollTrigger: {
	// 					trigger: container,
	// 					start: "top bottom",
	// 					end: "center center-=200px",
	// 					scrub: 1.5
	// 				}
	// 			}
	// 		);

	// 		// Clean up the animation when the component unmounts or the effect re-runs
	// 		return () => {
	// 			animation.kill();
	// 			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
	// 		};
	// 	}
	// 	if (
	// 		container &&
	// 		!isFetchingArticles &&
	// 		articles?.length &&
	// 		window.innerWidth < 485
	// 	) {
	// 		const animation = gsap.fromTo(
	// 			[title, categoriesArr, ...cards, button],
	// 			{
	// 				y: 500
	// 			},
	// 			{
	// 				y: 0,
	// 				// ease: "none",
	// 				stagger: 1,
	// 				// duration: 1.5,
	// 				scrollTrigger: {
	// 					trigger: container,
	// 					start: "top bottom",
	// 					end: "bottom center+=300px",
	// 					scrub: 1.5
	// 				}
	// 			}
	// 		);

	// 		// Clean up the animation when the component unmounts or the effect re-runs
	// 		return () => {
	// 			animation.kill();
	// 			ScrollTrigger.getAll().forEach(trigger => trigger.kill());
	// 		};
	// 	}
	// }, [isFetchingArticles, articles?.length]);
	const { scrollYProgress } = useScroll({
		target: mainRef,
		offset: ["start end", "end end"]
	});

	const rawY = useTransform(scrollYProgress, [0, 0.2], [300, 0]);
	const y = useSpring(rawY, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
	const opacity = useSpring(rawOpacity, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});

	const rawYButton = useTransform(scrollYProgress, [0.8, 1], [200, 0]);
	const yButton = useSpring(rawYButton, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacityButton = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
	const opacityButton = useSpring(rawOpacityButton, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	return (
		<div className={styles.bestWork} ref={mainRef}>
			<motion.div className={styles.container} style={{ y, opacity }}>
				<Title
					className={styles.title}
					title="Explore Some Of Our Best Work"
					subTitle="PROJECTS"
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
						{articles?.slice(0, 6).map((article, index) => (
							<Card
								article={article}
								index={index}
								key={index}
								scrollYProgress={scrollYProgress}
								router={router}
							/>
						))}
					</div>
				)}
				<motion.div
					className={styles.link_container}
					style={{ y: yButton, opacity: opacityButton }}
				>
					<CustomLink href="/projects" label="See All Projects" />
				</motion.div>
			</motion.div>
		</div>
	);
};

export default BestWork;

interface CardProps {
	article: IArticle;
	index: number;
	scrollYProgress: MotionValue<number>;
	router: ReturnType<typeof useRouter>;
}

const Card = ({ article, index, scrollYProgress, router }: CardProps) => {
	const start = 0 + index * 0.1;
	const end = start + 0.3;
	const rawY = useTransform(scrollYProgress, [start, end], [300, 0]);
	const y = useSpring(rawY, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});

	const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);
	return (
		<motion.div
			onClick={() => router.push(`/projects/${article.slug}`)}
			className={styles.card}
			key={index}
			style={{ y, opacity }}
		>
			{article.videos && (
				<div className={styles.image}>
					<Image
						src={article.videos[0].thumbnail}
						alt={article.title as string}
						fill
					/>
				</div>
			)}
			<div className={styles.text}>
				<h3>{article.title}</h3>
			</div>
		</motion.div>
	);
};
