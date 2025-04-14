import React from "react";
import styles from "./Footer.module.scss";
import Logo from "../logo/Logo";
import Title from "../title/Title";
import WaitListInput from "../waitListInput/WaitListInput";
import Image from "next/image";
import Link from "next/link";
import { socialMediaLinks } from "@/mock";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
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
							<Link href="tel:+1234567890" className={styles.small_row}>
								<div className={styles.icon}>
									<Image fill alt="" src="/images/icon-call.png" />
								</div>
								<p>+123 456 7890</p>
							</Link>
							<Link
								href="mailto:info@ardors.co"
								className={styles.small_row}
							>
								<div className={styles.icon}>
									<Image fill alt="" src="/images/icon-mail.png" />
								</div>
								<p>info@ardors.co</p>
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

						<div className={styles.grid}>
							{socialMediaLinks.map(item => (
								<Link
									href={item.href}
									key={item.label}
									className={styles.icon}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Image fill alt="" src={item.icon} />
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
