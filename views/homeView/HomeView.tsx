import {
	BestWork,
	Hero,
	Impact,
	Process,
	Services,
	Slides,
	Testimonials,
	Connect
} from "@/components/home";
import React from "react";
import styles from "./HomeView.module.scss";
const HomeView = () => {
	return (
		<div className={styles.home}>
			<Hero />
			<Slides />
			<Services />
			<BestWork />
			<Process />
			<Impact />
			<Testimonials />
			<Connect />
		</div>
	);
};

export default HomeView;
