"use client";

import { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";
import styles from "./Testimonials.module.scss";
import Title from "@/shared/title/Title";
import Image from "next/image";

const testimonials = [
	{
		review: "Working withArdors studio was a game-changer! Their motion design and video editing took our brand to the next level. Highly recommended!",
		reviewer: {
			name: "Mr. Precious",
			avatar: "/images/precious.png",
			role: "Marketing Director, Tech Startup"
		}
	},
	{
		review: "Working withArdors studio was a game-changer! Their motion design and video editing took our brand to the next level. Highly recommended!",
		reviewer: {
			name: "Mr. Precious",
			avatar: "/images/precious.png",
			role: "Marketing Director, Tech Startup"
		}
	},
	{
		review: "Working withArdors studio was a game-changer! Their motion design and video editing took our brand to the next level. Highly recommended!",
		reviewer: {
			name: "Mr. Precious",
			avatar: "/images/precious.png",
			role: "Marketing Director, Tech Startup"
		}
	},
	,
	{
		review: "Working withArdors studio was a game-changer! Their motion design and video editing took our brand to the next level. Highly recommended!",
		reviewer: {
			name: "Mr. Precious",
			avatar: "/images/precious.png",
			role: "Marketing Director, Tech Startup"
		}
	},
	{
		review: "Working withArdors studio was a game-changer! Their motion design and video editing took our brand to the next level. Highly recommended!",
		reviewer: {
			name: "Mr. Precious",
			avatar: "/images/precious.png",
			role: "Marketing Director, Tech Startup"
		}
	},
	{
		review: "Working withArdors studio was a game-changer! Their motion design and video editing took our brand to the next level. Highly recommended!",
		reviewer: {
			name: "Mr. Precious",
			avatar: "/images/precious.png",
			role: "Marketing Director, Tech Startup"
		}
	},
	{
		review: "Working withArdors studio was a game-changer! Their motion design and video editing took our brand to the next level. Highly recommended!",
		reviewer: {
			name: "Mr. Precious",
			avatar: "/images/precious.png",
			role: "Marketing Director, Tech Startup"
		}
	}
];
const Testimonials = () => {
	const [slides, setSlides] = useState<number>(2);

	useEffect(() => {
		if (window.innerWidth <= 600) {
			setSlides(1);
		} else {
			setSlides(2);
		}
	}, []);
	return (
		<section className={styles.testimonials}>
			<div className={styles.container}>
				<Title
					title="Success Stories from Our Clients"
					subTitle="TESTIMONIALS"
					className={styles.title}
				/>
				<div className={`${styles.slider}`}>
					<Swiper
						slidesPerView={slides}
						spaceBetween={16}
						pagination={{
							clickable: true
						}}
						modules={[Pagination, Autoplay]}
						centeredSlides
						autoplay={{
							delay: 3000,
							disableOnInteraction: false
						}}
						loop
						// navigation
					>
						{testimonials.map((review, index: number) => (
							<SwiperSlide key={index}>
								<div className={styles.slide}>
									<div className={styles.quote}>
										<Image
											src="/svgs/quote.svg"
											fill
											alt=""
											sizes="100vw"
										/>
									</div>
									<div className={styles.row}>
										<div className={styles.text}>
											<h2>{review?.review}</h2>
										</div>
										{review && (
											<div className={styles.avatar}>
												<Image
													src={review.reviewer.avatar}
													alt={review.reviewer.name}
													fill
													sizes="100vw"
												/>
											</div>
										)}
										<div className={styles.text}>
											<h3>{review?.reviewer.name}</h3>
											<p>{review?.reviewer.role}</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
