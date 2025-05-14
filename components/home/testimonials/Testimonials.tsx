"use client";

import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useState } from "react";
import styles from "./Testimonials.module.scss";
import Title from "@/shared/title/Title";
import Image from "next/image";
import { useGetTestimonials } from "@/app/api/hooks/testimonials";
import { PageLoader } from "@/shared/loaders";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
	const [slides, setSlides] = useState<number>(2);
	const { data: testimonials, isLoading } = useGetTestimonials();

	const mainRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = mainRef.current;
		const title = container?.querySelector(`.${styles.title}`) as HTMLElement;
		const slider = container?.querySelector(`.${styles.slider}`) as HTMLElement;
		if (container && !isLoading && window.innerWidth > 485) {
			const animation = gsap.fromTo(
				[title, slider],
				{
					y: 500
				},
				{
					y: 0,
					ease: "none",
					stagger: 0.2,
					// duration: 1.5,
					scrollTrigger: {
						trigger: container,
						start: "top bottom-=100px",
						end: "center center-=100px",
						scrub: 1.5
					}
				}
			);
			return () => {
				animation.kill();
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			};
		}
		if (container && !isLoading && window.innerWidth < 485) {
			const animation = gsap.fromTo(
				[title, slider],
				{
					y: 500
				},
				{
					y: 0,
					ease: "none",
					stagger: 0.2,
					// duration: 1.5,
					scrollTrigger: {
						trigger: container,
						start: "top bottom-=400px",
						end: "bottom center-=700px",
						scrub: 1.5
					}
				}
			);
			return () => {
				animation.kill();
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			};
		}
	}, [isLoading]);

	useEffect(() => {
		if (window.innerWidth <= 600) {
			setSlides(1);
		} else {
			setSlides(2);
		}
	}, []);
	return (
		<section className={styles.testimonials} ref={mainRef}>
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
						{isLoading ? (
							<PageLoader />
						) : (
							testimonials?.data.map((review, index: number) => (
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
												<h2>{review?.description}</h2>
											</div>
											<div className={styles.details}>
												<div className={styles.avatar}>
													<Image
														src={review?.image || ""}
														alt={review?.name || ""}
														fill
														sizes="100vw"
													/>
												</div>
												<div className={styles.text}>
													<h3>{review?.name}</h3>
													<p>{review?.role}</p>
												</div>
											</div>
										</div>
									</div>
								</SwiperSlide>
							))
						)}
					</Swiper>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
