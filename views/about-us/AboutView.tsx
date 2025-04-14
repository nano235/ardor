import React from "react";
import styles from "./AboutView.module.scss";
import { Title } from "@/shared";
import Image from "next/image";

const AboutView = () => {
	return (
		<div className={styles.about}>
			<div className={styles.container}>
				<div className={styles.row}>
					<Title title="Who we are" />
					<div className={styles.text}>
						<h6>
							Ardor Studio is a motion design and video editing studio
							dedicated to crafting visually compelling stories that
							captivate audiences. With a team of expert designers and
							editors, we specialize in creating high-quality motion
							graphics, animated explainers, brand videos, and cinematic
							edits for businesses, brands, and content creators worldwide.
						</h6>
					</div>
				</div>
				<div className={styles.row}>
					<Title title="WHAT WE DO" />
					<div className={styles.text}>
						<h6>
							At Ardor Studio, we transform ideas into stunning visuals
							through:
						</h6>
						<ul>
							<li>
								Motion Design – Engaging animations that bring concepts to
								life.
							</li>
							<li>
								Video Editing – Seamless storytelling with professional
								post-production.
							</li>
							<li>
								Brand Videos – Helping businesses create a strong visual
								identity.
							</li>
							<li>
								Explainer & Promo Videos – Breaking down complex messages
								into digestible content.
							</li>
							<li>
								Cinematic Editing – High-end movie-style storytelling.
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.row}>
					<Title title="Who we are" />
					<div className={styles.text}>
						<h6>
							We believe in emotion-driven storytelling, where every motion
							graphic and edit is designed to resonate with your audience.
							Our process is built on collaboration, creativity, and
							precision, ensuring every project delivers impact. Whether you
							need a sleek corporate video or a dynamic social media ad, we
							tailor our work to fit your brand’s vision.
						</h6>
					</div>
				</div>
				<div className={styles.block}>
					<Title title="Meet Our Team" className={styles.title} />
					<div className={styles.grid}>
						{Array.from({ length: 6 }).map((_, index) => (
							<div className={styles.card} key={index}>
								<div className={styles.image}>
									<Image src={`/images/precious.png`} alt="team" fill />
								</div>
								<div className={styles.text}>
									<h3>Precious</h3>
									<p>Founder</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutView;
