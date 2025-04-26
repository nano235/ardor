import { api } from "../../api";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { IArticle, IArticleResponse } from "./types";

const useGetArticles = () => {
	return useQuery<IArticleResponse, Error>({
		queryKey: ["articles"],
		queryFn: async () => {
			const response = await api.get(API_URL.article);
			return response.data;
		}
	});
};

const useGetFeaturedArticles = () => {
	return useQuery<IArticle[], Error>({
		queryKey: ["articles", "featured"],
		queryFn: async () => {
			const response = await api.get(`${API_URL.article}/featured`);
			return response.data;
		}
	});
};

const useGetArticlesBySlug = (slug: string) => {
	return useQuery<IArticleResponse, Error>({
		queryKey: ["articles", slug],
		queryFn: async () => {
			const response = await api.get(`${API_URL.article}/${slug}`);
			return response.data;
		},
		enabled: !!slug
	});
};

const useGetArticleByCategory = (categorySlug: string) => {
	return useQuery<IArticleResponse, Error>({
		queryKey: ["articles", categorySlug],
		queryFn: async () => {
			const response = await api.get(`${API_URL.article}/category/${categorySlug}`);
			return response.data;
		},
		enabled: !!categorySlug
	});
};

const usePostArticle = (
	options?: Omit<UseMutationOptions<IArticle, Error, IArticle>, "mutationFn">
) => {
	return useMutation<IArticle, Error, IArticle>({
		mutationFn: async props => {
			const response = await api.post(API_URL.article, {
				...props
			});
			return response.data;
		},
		...options
	});
};

const usePatchArticle = (
	id: string,
	options?: Omit<UseMutationOptions<IArticle, Error, IArticle>, "mutationFn">
) => {
	return useMutation<IArticle, Error, IArticle>({
		mutationFn: async props => {
			const response = await api.patch(`${API_URL.article}/${id}`, {
				...props
			});
			return response.data;
		},
		...options
	});
};

const useDeleteArticle = (
	options?: Omit<UseMutationOptions<IArticle, Error, IArticle>, "mutationFn">
) => {
	return useMutation<IArticle, Error, IArticle>({
		mutationFn: async ({ id }) => {
			const response = await api.delete(`${API_URL.article}/${id}`);
			return response.data;
		},
		...options
	});
};
export {
	useGetArticles,
	useGetFeaturedArticles,
	usePostArticle,
	useGetArticlesBySlug,
	useGetArticleByCategory,
	usePatchArticle,
	useDeleteArticle
};
