import { Footer } from "@/shared";
import { Header } from "@/shared";
import { navLinks } from "@/mock";
export default function AppLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header navLinks={navLinks} />
			{children}
			<Footer />
		</>
	);
}
