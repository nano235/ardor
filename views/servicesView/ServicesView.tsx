"use client";

import React from "react";
import styles from "./ServicesView.module.scss";
import { Button, Title } from "@/shared";
import { cards } from "@/components/home/services/Services";
import Image from "next/image";
import { shortenTitle } from "@/utils/stringShortner copy";
import { useRouter } from "next/navigation";

const ServicesView = () => {
	const router = useRouter();
	return (
		<div className={styles.services}>
			<div className={styles.container}>
				<div className={styles.row}>
					<Title
						title="Bring Your Vision to Life with Our Expert Video Services"
						className={styles.title}
					/>
					<div className={styles.text}>
						<h6>
							From product demos to promotional videos, we craft
							high-quality motion design and video edits that engage your
							audience and elevate your brand
						</h6>
					</div>
				</div>
				<div className={styles.grid}>
					{cards.map((card, index) => (
						<div className={styles.card_container} key={index}>
							<div
								className={styles.card}
								style={{
									backgroundImage: `url(${card.image.src})`
								}}
							>
								<div className={styles.background}>
									<div className={styles.icon_container}>
										<div className={styles.icon}>
											<Image
												src={card.icon}
												alt={card.title}
												fill
											/>
										</div>
									</div>
									<div className={styles.text}>
										<h3>{card.title}</h3>
										<p>{card.description}</p>
									</div>
									<Button
										className={styles.button}
										onClick={() => router.push(card.link)}
									>
										Learn More
									</Button>
								</div>
							</div>
							<div className={styles.card_mobile}>
								<div className={styles.text}>
									<h3>{shortenTitle(card.title, 17)}</h3>
									<p>{card.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServicesView;
