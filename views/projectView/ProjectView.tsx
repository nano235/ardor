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
	const details = [
		{
			title: "Client",
			value: article?.client
		},
		article?.agency && {
			title: "Agency",
			value: article?.agency
		},
		article?.productionTime && {
			title: "Production Time",
			value: article?.productionTime
		},
		article?.videoType && {
			title: "Video Type",
			value: article?.videoType
		},
		article?.attendance && {
			title: "Attendance",
			value: article?.attendance
		},
		article?.projectType && {
			title: "Project Type",
			value: article?.projectType
		},
		article?.metrics && {
			title: "Metrics",
			value: article?.metrics
		},
		article?.website && {
			title: "Website",
			value: article?.website
		},
		article?.credit && {
			title: "Credit",
			value: article?.credit
		}
	].filter(Boolean);
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
						{details.map(detail =>
							typeof detail === "object" && detail.title ? (
								<div className={styles.text} key={detail.title}>
									<h3>{detail.title}</h3>
									<p>{detail.value}</p>
								</div>
							) : null
						)}
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
					{article?.images?.map(image => (
						<div className={styles.photo} key={image}>
							<Image src={image} alt="photo" fill />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProjectView;
