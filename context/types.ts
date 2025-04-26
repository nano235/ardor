import { ReactNode } from "react";

export interface AuthProviderProps {
	children: ReactNode;
}

export interface ProtectRouteProps {
	children: ReactNode;
}

export interface DefaultProviderType {
	isAuthenticated: boolean;
	user: null;
	loading: boolean;
	logout: () => Promise<void>;
	isTokenFetched: boolean;
}
