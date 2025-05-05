"use client";

import React from "react";
import styles from "./CareersView.module.scss";
import { Button, Title } from "@/shared";
import Image from "next/image";
import { useGetCareers } from "@/app/api/hooks/careers";
import { PageLoader } from "@/shared/loaders";
const CareersView = () => {
	const { data: careers, isFetching } = useGetCareers();
	return (
		<div className={styles.careers}>
			<div className={styles.container}>
				<Title
					className={styles.title}
					title="Join Our World-Class Team of Creatives"
					description="Passionate about motion design and video editing? We’re always looking for talented creatives to bring fresh ideas to life. Let’s build something amazing together! 🚀"
				/>
				<Button
					className={styles.button}
					buttonType="secondary"
					icon="/svgs/arrow-white.svg"
					href="mailto:info@ardors.com"
				>
					info@ardors.com
				</Button>
				<div className={styles.card_container}>
					{isFetching ? (
						<PageLoader />
					) : careers?.data.length ? (
						careers?.data?.map((career, index) => (
							<div className={styles.card} key={index}>
								<div className={styles.details}>
									<h3>{career.title}</h3>
									<p>{career.description}</p>
									<div className={styles.row}>
										<div className={styles.card_button}>
											<div className={styles.icon}>
												<Image
													src="/svgs/location.svg"
													alt="location"
													width={16}
													height={16}
												/>
											</div>
											<p>{career.location}</p>
										</div>
										<div className={styles.card_button}>
											<div className={styles.icon}>
												<Image
													src="/svgs/clock.svg"
													alt="clock"
													width={16}
													height={16}
												/>
											</div>
											<p>{career.jobType}</p>
										</div>
									</div>
								</div>
								<Button
									className={styles.apply_button}
									icon="/svgs/arrow-white.svg"
									href="mailto:info@ardors.com"
								>
									Apply Now
								</Button>
							</div>
						))
					) : (
						<div className={styles.no_careers}>
							<div className={styles.image}>
								<Image src="/svgs/job.svg" alt="no-careers" fill />
							</div>
							<Title
								className={styles.title}
								title="No Open Roles at the Moment"
								description="We're always looking for talented creatives. Check back soon or reach out—we’d love to hear from you!"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CareersView;
