"use client";

import styles from "./Logo.module.scss";
import React from "react";

import Image from "next/image";
import { useGetGeneral } from "@/app/api/hooks/general";
interface Props {
	className?: string;
	type?: "main" | "footer";
}

const Logo = ({ className }: Props) => {
	const { data: general } = useGetGeneral();
	return (
		<div className={`${styles.logo} ${className}`}>
			<Image
				src={general?.data?.logo || ""}
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
