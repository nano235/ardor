import { ProtectRoute } from "@/context/AuthContext";
import { Header, Footer } from "@/shared";
import { adminNavLinks } from "@/mock";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<ProtectRoute>
			<Header navLinks={adminNavLinks} />
			{children}
			<Footer />
		</ProtectRoute>
	);
}
