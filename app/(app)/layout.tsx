import { Footer } from "@/shared";
import { Header } from "@/shared";
import { navLinks } from "@/mock";
import { PreLoader } from "@/shared/loaders";
export default function AppLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header navLinks={navLinks} />
			<PreLoader />
			{children}
			<Footer />
		</>
	);
}
