"use client";

import { navLinks } from "@/mock";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Logo, Button } from "@/shared";
import styles from "./Header.module.scss";
// import { scrollTo } from "@/utils";
import { NavLink } from "@/interfaces";
import { usePathname } from "next/navigation";

const Header = () => {
	// const router = useRouter();
	const pathname = usePathname();
	const [scroll, setScroll] = useState<boolean>(false);
	const [collapsed, setCollapsed] = useState<boolean>(true);
	// const [dropDown, setDropDown] = useState<boolean>(false);
	const ref = useRef<HTMLElement>(null);
	// const handleNavClick = (id: string) => {
	// 	scrollTo({ id });
	// 	setCollapsed(true);
	// };

	// const toggling = (event: React.MouseEvent) => {
	//   setDropDown(!dropDown)
	//   event.stopPropagation()
	// }

	// useEffect(() => {
	// 	const handleClickOutside = () => {
	// 		setDropDown(false);
	// 	};

	// 	document.addEventListener("click", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("click", handleClickOutside);
	// 	};
	// }, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Check initial scroll position
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const checkActive = (href: string) => {
		const isActive = href === pathname;
		return isActive;
	};
	return (
		<header
			className={`${styles.header} ${scroll ? styles.header_scrolled : ""}`}
			ref={ref}
		>
			<div className={styles.container}>
				<Link href="/">
					<div
						className={styles.header_logoContainer}
						onClick={() => setCollapsed(true)}
					>
						<Logo />
					</div>
				</Link>
				<div
					className={
						styles[
							!collapsed ? "header_wrapper" : "header_wrapper__collapsed"
						]
					}
				>
					<nav className={styles.header_nav}>
						<ul className={styles.header_navList}>
							{navLinks.map(({ label, external, href }: NavLink, index) => {
								return (
									<li
										key={index}
										className={`${styles.header_navLink} ${label}`}
										onClick={() => setCollapsed(true)}
										data-active={checkActive(href)}
									>
										{external ? (
											<a
												href={href}
												rel="noreferrer"
												target="_blank"
											>
												{label}
											</a>
										) : (
											<Link href={href}>{label}</Link>
										)}
									</li>
								);
							})}
						</ul>
					</nav>
					<div className={styles.button_container}>
						<Link href="/contact-us">
							<Button className={styles.button}>Let’s Work Together</Button>
						</Link>
						{/* <Button className={styles.button}>Log In</Button> */}
					</div>
				</div>
				<div
					onClick={() => setCollapsed(!collapsed)}
					className={
						styles[collapsed ? "header_hamburger" : "header_hamburger__open"]
					}
				>
					<span className={styles.header_hamburgerBar}></span>
					<span className={styles.header_hamburgerBar}></span>
				</div>
			</div>
		</header>
	);
};

export default Header;
