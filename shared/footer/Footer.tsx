"use client";

import React from "react";
import styles from "./Footer.module.scss";
import Logo from "../logo/Logo";
import Title from "../title/Title";
import WaitListInput from "../waitListInput/WaitListInput";
import Image from "next/image";
import Link from "next/link";
import { useAppAssets } from "@/hooks/useLoading";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
	const { useGetGeneral } = useAppAssets();
	const { data: general } = useGetGeneral();

	const socialMediaLinks = [
		general?.data.twitter && {
			label: "x",
			href: general?.data.twitter,
			icon: "/svgs/icon-x.svg"
		},
		general?.data.linkedin && {
			label: "linkedIn",
			href: general?.data.linkedin,
			icon: "/svgs/icon-linkedin.svg"
		},
		general?.data.facebook && {
			label: "facebook",
			href: general?.data.facebook,
			icon: "/svgs/icon-facebook.svg"
		},
		general?.data.instagram && {
			label: "instagram",
			href: general?.data.instagram,
			icon: "/svgs/icon-instagram.svg"
		},
		general?.data.tikTok && {
			label: "tiktok",
			href: general?.data.tikTok,
			icon: "/svgs/icon-tiktok.svg"
		}
	].filter(Boolean);

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<Logo className={styles.logo} />
				<div className={styles.row_center}>
					<Title
						title="Let’s Create Something Amazing Together"
						description="Ready to elevate your brand with stunning visuals? Get in touch, and let’s bring your vision to life."
						className={styles.title}
					/>
					<WaitListInput />
				</div>
				<div className={styles.row}>
					<div className={styles.small_row}>
						<div className={styles.block}>
							<div className={styles.title}>
								<h3>CONTACT US</h3>
							</div>
							<Link
								href={`tel:${general?.data.phoneNumber}`}
								className={styles.small_row}
							>
								<div className={styles.icon}>
									<Image fill alt="" src="/images/icon-call.png" />
								</div>
								<p>{general?.data.phoneNumber}</p>
							</Link>
							<Link
								href={`mailto:${general?.data.email}`}
								className={styles.small_row}
							>
								<div className={styles.icon}>
									<Image fill alt="" src="/images/icon-mail.png" />
								</div>
								<p>{general?.data.email}</p>
							</Link>
						</div>
						<div className={styles.block}>
							<div className={styles.title}>
								<h3>JOIN OUR CREATIVE TEAM</h3>
							</div>
							<div className={styles.small_row}>
								<Link href="/careers">Careers</Link>
							</div>
						</div>
					</div>
					<div>
						<div className={styles.title}>
							<h3>FOLLOW ON SOCIAL MEDIA</h3>
						</div>

						<div
							className={styles.grid}
							style={{
								gridTemplateColumns: `repeat(${socialMediaLinks.length}, 2.4rem)`
							}}
						>
							{socialMediaLinks.map(item => (
								<Link
									href={item ? item?.href : ""}
									key={item ? item.label : ""}
									className={styles.icon}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image fill alt="" src={item ? item.icon : ""} />
								</Link>
							))}
						</div>
					</div>
				</div>
				<p className={styles.copyright}>
					&copy; {year} Ardors Studio. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
