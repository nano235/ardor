"use client";

import React from "react";
import styles from "./ProjectView.module.scss";
import Image from "next/image";
import { Title } from "@/shared";
import { useRouter, useParams } from "next/navigation";
import { useGetArticlesBySlug } from "@/app/api/hooks/articles";
import { IArticle } from "@/app/api/hooks/articles/types";
const ProjectView = () => {
	const router = useRouter();
	const { project } = useParams();

	const { data } = useGetArticlesBySlug(project as string);

	const article = data?.data as IArticle;
	const handleBack = () => {
		router.back();
	};
	console.log(article);
	return (
		<div className={styles.project}>
			<div className={styles.container}>
				<div className={styles.back} onClick={handleBack}>
					<div className={styles.icon}>
						<Image src="/svgs/arrow-white.svg" alt="back" fill />
					</div>
					<p>Back</p>
				</div>
				<Title title={article?.title} />
				<div className={styles.video}>
					<video
						src={article?.videos?.[0]?.url}
						controls
						poster={article?.videos?.[0]?.thumbnail}
						style={{ width: "100%", height: "100%" }}
					/>
				</div>
				<div className={styles.block}>
					<div className={styles.text}>
						<p>{article?.description}</p>
					</div>
					<div className={styles.grid}>
						<div className={styles.text}>
							<h3>Client</h3>
							<p>{article?.client}</p>
						</div>
						<div className={styles.text}>
							<h3>Agency</h3>
							<p>{article?.agency}</p>
						</div>
						<div className={styles.text}>
							<h3>Production Time</h3>
							<p>{article?.productionTime}</p>
						</div>
						<div className={styles.text}>
							<h3>Video Type</h3>
							<p>{article?.videoType}</p>
						</div>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.title}>
						<h1>Challenges</h1>
					</div>
					<div className={styles.text}>
						<p>{article?.challenges?.map(challenge => challenge)}</p>
					</div>
				</div>
				<div className={styles.row}>
					<div className={styles.title}>
						<h1>Solutions</h1>
					</div>
					<div className={styles.text}>
						<p>{article?.solutions?.map(solution => solution)}</p>
					</div>
				</div>
				<div className={styles.photo_grid}>
					{article?.images?.map((image, index) => (
						<div
							className={styles.photo}
							key={image}
							style={{ gridColumn: index === 0 ? "span 2" : "span 1" }}
						>
							<Image src={image} alt="photo" fill />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectView;
