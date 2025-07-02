"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import styles from "./Slider.module.scss";
import { useAppAssets } from "@/hooks/useLoading";

interface SliderProps {
	sliders: {
		title: string;
		description: string;
		image: string;
		id: number;
	}[];
	className?: string;
}

type Video = {
	id: number;
	src: string;
};

const Slider = ({ sliders, className }: SliderProps) => {
	const { useGetGeneral } = useAppAssets();
	const { data: general } = useGetGeneral();
	const videos: Video[] = [
		{
			id: 1,
			src: general?.data.discovery || "youtube.com"
		},
		{
			id: 2,
			src: general?.data.script || "youtube.com"
		},
		{
			id: 3,
			src: general?.data.design || "youtube.com"
		},
		{
			id: 4,
			src: general?.data.expert || "youtube.com"
		},
		{
			id: 5,
			src: general?.data.sound || "youtube.com"
		},
		{
			id: 6,
			src: general?.data.delivery || "youtube.com"
		}
	];
	const displayedVideo = (id: number): Video => {
		return (
			videos.find(video => video.id === id) || { id: 0, src: "/fallback-image.jpg" }
		);
	};
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
							<video
								src={
									displayedVideo(slider.id)?.src ||
									"https://www.youtube.com"
								}
								autoPlay
								muted
								loop
								playsInline
								style={{ width: "100%", height: "100%" }}
							/>
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
