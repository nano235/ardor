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
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
	const [slides, setSlides] = useState<number>(2);
	const { data: testimonials, isLoading } = useGetTestimonials();

	const mainRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: mainRef,
		offset: ["start end", "end center"]
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

	const rawYSlides = useTransform(scrollYProgress, [0.2, 0.7], [200, 0]);
	const ySlides = useSpring(rawYSlides, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});
	const rawOpacitySlides = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
	const opacitySlides = useSpring(rawOpacitySlides, {
		stiffness: 100,
		damping: 20,
		mass: 0.5
	});

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
				<motion.div style={{ y, opacity }}>
					<Title
						title="Success Stories from Our Clients"
						subTitle="TESTIMONIALS"
						className={styles.title}
					/>
				</motion.div>
				<motion.div
					className={`${styles.slider}`}
					style={{ y: ySlides, opacity: opacitySlides }}
				>
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
				</motion.div>
			</div>
		</section>
	);
};

export default Testimonials;
