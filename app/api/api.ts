import Axios, { CreateAxiosDefaults } from "axios";
import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/utils/tokenStorage";

const DEFAULT_API_CONFIG: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_MAIN_URL,
	// baseURL: "http://localhost:5000",
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
};

const api = Axios.create(DEFAULT_API_CONFIG);

// Add token to request header
api.interceptors.request.use(config => {
	const token = `Bearer ${getAuthToken()}`;
	if (config.headers && getAuthToken()) {
		config.headers.Authorization = token;
	}
	return config;
});

api.defaults.data = {};

const queryClient = new QueryClient({
	defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

export { api, queryClient };
