"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./Slider.module.scss";
import Image from "next/image";

interface SliderProps {
	sliders: {
		title: string;
		description: string;
		image: string;
	}[];
	className?: string;
}

const Slider = ({ sliders, className }: SliderProps) => {
	return (
		<div className={`${styles.slider} ${className}`}>
			<Swiper
				slidesPerView={1}
				// spaceBetween={32}
				modules={[Autoplay, Pagination]}
				loop
				autoplay={{
					delay: 3000,
					disableOnInteraction: false
				}}
				pagination={{
					clickable: true
				}}
			>
				{sliders.map(slider => (
					<SwiperSlide key={slider.title} className={styles.slide}>
						<div className={styles.image}>
							<Image src={slider.image} alt={slider.title} fill />
						</div>
						<div className={styles.details}>
							<h4>{slider.title}</h4>
							<p>{slider.description}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Slider;
