"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./CustomLink.module.scss";

interface Props {
	href: string;
	label: string;
	className?: string;
}

const CustomLink = ({ href, label, className }: Props) => {
	return (
		<Link className={`${styles.link} ${className}`} href={href}>
			<span>
				<Image src="/svgs/arrow-white.svg" fill alt="" />
			</span>
			<p>{label}</p>
		</Link>
	);
};

export default CustomLink;
