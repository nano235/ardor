import { NavLink } from "@/interfaces";

export const navLinks: NavLink[] = [
	{
		label: "home",
		href: "/",
		external: false
	},
	{
		label: "projects",
		href: "/projects",
		external: false
	},

	{
		label: "services",
		href: "/services",
		external: false
	},

	{
		label: "about us",
		href: "/about-us",
		external: false
	},

	{
		label: "contact us",
		href: "/contact-us",
		external: false
	}
];

export const adminNavLinks: NavLink[] = [
	{
		label: "general",
		href: "/admin/general",
		external: false
	},
	{
		label: "testimonials",
		href: "/admin/testimonials",
		external: false
	},
	{
		label: "teams",
		href: "/admin/teams",
		external: false
	},
	{
		label: "careers",
		href: "/admin/careers",
		external: false
	},
	{
		label: "categories",
		href: "/admin/categories",
		external: false
	},
	{
		label: "articles",
		href: "/admin/articles",
		external: false
	}
];

export const socialMediaLinks = [
	{
		label: "x",
		href: "https://x.com/ardors_co",
		icon: "/svgs/icon-x.svg"
	},
	{
		label: "linkedIn",
		href: "https://www.linkedin.com/company/ardors-co",
		icon: "/svgs/icon-linkedin.svg"
	},
	{
		label: "facebook",
		href: "https://www.facebook.com/ardors.co",
		icon: "/svgs/icon-facebook.svg"
	},
	{
		label: "instagram",
		href: "https://www.instagram.com/ardors.co",
		icon: "/svgs/icon-instagram.svg"
	},
	{
		label: "tiktok",
		href: "https://www.tiktok.com/@ardors.co",
		icon: "/svgs/icon-tiktok.svg"
	}
];
