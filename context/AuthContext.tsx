"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthProviderProps, ProtectRouteProps } from "./types";
import { removeAuthToken } from "@/utils/tokenStorage";
import { DefaultProviderType } from "./types";
// import { useGetUser, useGetVerifyToken } from "@/app/api/hooks/users";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { clearUser, updateUser } from "@/store/slices/userSlice";
// import { queryClient } from "@/app/api";
// import { PreLoader } from "@/shared/loaders";
import { useGetVerifyToken } from "@/app/api/hooks/auth";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<DefaultProviderType>({
	isAuthenticated: false,
	user: null,
	loading: false,
	logout: async () => {},
	isTokenFetched: false
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const user = useAppSelector(state => state.user);

	const [isTokenValid, setIsTokenValid] = useState(false);
	// const { isFetching: isUserLoading, data: userData } = useGetUser({
	// 	userId: user.userId as string,
	// });

	const { data: tokenData, isFetched, isLoading } = useGetVerifyToken();

	const queryClient = useQueryClient();

	useEffect(() => {
		queryClient.invalidateQueries({
			queryKey: ["verifyToken"],
			exact: true
		});
	}, [pathname, queryClient]);
	// Sync User Data
	useEffect(() => {
		if (tokenData) {
			dispatch(updateUser({ isAuthenticated: true, ...tokenData }));
			// setAuthToken(tokenData.token);
			setIsTokenValid(true);
		} else {
			// dispatch(clearUser());
			// setIsTokenValid(false);
		}
	}, [tokenData, dispatch]);

	// Logout Function
	const logout = async () => {
		removeAuthToken();
		dispatch(clearUser());
		queryClient.clear();
		router.replace("/admin/login");
	};

	const authValues = useMemo(
		() => ({
			isAuthenticated: isTokenValid,
			user,
			loading: isLoading,
			logout,
			isTokenFetched: isFetched
		}),
		[user, isTokenValid, logout, isFetched]
	);

	return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { isAuthenticated, loading, isTokenFetched } = useAuth();

	const UNPROTECTED_ROUTES = useMemo(() => ["/admin/login"], []);

	const returnUrl = searchParams.get("returnUrl");

	useEffect(() => {
		if (!loading && isTokenFetched) {
			if (!isAuthenticated && !UNPROTECTED_ROUTES.includes(pathname)) {
				router.replace(`/admin/login?returnUrl=${pathname}`);
			} else if (isAuthenticated && pathname === "/admin/login") {
				router.replace(returnUrl || "/admin/articles");
			}
		}
	}, [
		isAuthenticated,
		loading,
		pathname,
		returnUrl,
		isTokenFetched,
		UNPROTECTED_ROUTES,
		router
	]);

	if (loading || !isTokenFetched) {
		return;
	}

	return <>{children}</>;
};
