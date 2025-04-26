import { api } from "../../api";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { ICategory, ICategoryResponse, IEditCategory } from "./types";

const useGetCategories = () => {
	return useQuery<ICategoryResponse, Error>({
		queryKey: ["categories"],
		queryFn: async () => {
			const response = await api.get(API_URL.category);
			return response.data;
		}
	});
};

const useGetCategoriesBySlug = (slug: string) => {
	return useQuery<ICategory[], Error>({
		queryKey: ["categories", slug],
		queryFn: async () => {
			const response = await api.get(`${API_URL.category}/${slug}`);
			return response.data;
		}
	});
};

const useGetCategoryById = (id: string) => {
	return useQuery<IEditCategory, Error>({
		queryKey: ["categories", id],
		queryFn: async () => {
			const response = await api.get(`${API_URL.category}/id/${id}`);
			return response.data;
		},
		enabled: !!id
	});
};

const usePostCategory = (
	options?: Omit<UseMutationOptions<ICategory, Error, ICategory>, "mutationFn">
) => {
	return useMutation<ICategory, Error, ICategory>({
		mutationFn: async props => {
			const response = await api.post(API_URL.category, {
				...props
			});
			return response.data;
		},
		...options
	});
};

const usePatchCategory = (
	id: string,
	options?: Omit<UseMutationOptions<ICategory, Error, ICategory>, "mutationFn">
) => {
	return useMutation<ICategory, Error, ICategory>({
		mutationFn: async props => {
			const response = await api.patch(`${API_URL.category}/${id}`, {
				...props
			});
			return response.data;
		},
		...options
	});
};

const useDeleteCategory = (
	options?: Omit<UseMutationOptions<ICategory, Error, ICategory>, "mutationFn">
) => {
	return useMutation<ICategory, Error, ICategory>({
		mutationFn: async ({ id }) => {
			const response = await api.delete(`${API_URL.category}/${id}`);
			return response.data;
		},
		...options
	});
};
export {
	useGetCategories,
	usePostCategory,
	useGetCategoriesBySlug,
	useGetCategoryById,
	usePatchCategory,
	useDeleteCategory
};
