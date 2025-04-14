"use client";

import styles from "./Accordion.module.scss";

interface AccordionProps {
	id: string | number;
	title: string;
	description: string;
	isActive: boolean;
	onToggle: (id: string | number) => void;
}

const Accordion = ({ id, title, description, isActive, onToggle }: AccordionProps) => {
	const handleClick = () => {
		onToggle(id);
	};
	return (
		<div className={styles.accordion} data-active={isActive}>
			<div className={styles.header} onClick={handleClick}>
				<div className={styles.plus_minus}>
					<div
						className={!isActive ? styles.plus_sign : styles.minus_sign}
					></div>
				</div>
				<div className={styles.text}>
					<h3>{title}</h3>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.text}>
					<p>{description}</p>
				</div>
			</div>
		</div>
	);
};

export default Accordion;
