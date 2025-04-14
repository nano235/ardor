import styles from "./Logo.module.scss";
import React from "react";

import Image from "next/image";

interface Props {
	className?: string;
	type?: "main" | "footer";
}

const Logo = ({ className, type = "main" }: Props) => {
	return (
		<div className={`${styles.logo} ${className}`}>
			<Image
				src={`/images/${type === "main" ? "logo" : "footer-logo"}.png`}
				loading="eager"
				priority={true}
				alt="Ardor"
				fill
				sizes="100vw"
				quality={100}
			/>
		</div>
	);
};

export default Logo;
