"use client";
import React from "react";
import styles from "./Button.module.scss";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	buttonType?: "secondary" | "transparent";
	children: React.ReactNode;
	className?: string;
	href?: string;
	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
	icon?: string;
}

const Button = ({
	children,
	className,
	href,
	onClick,
	buttonType,
	icon,
	...otherProps
}: Props) => {
	const router = useRouter();
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (href) {
			router.push(href);
		}
		if (onClick) {
			onClick(e);
		}
	};

	return (
		<button
			onClick={handleClick}
			className={`${className} ${styles.button}`}
			data-type={buttonType ? buttonType : ""}
			{...otherProps}
		>
			<figure className={styles.button_icon}>
				<Image src={icon || "/svgs/arrow.svg"} layout="fill" alt="" />
			</figure>
			<p>{children}</p>
		</button>
	);
};

export default Button;
