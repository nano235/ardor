import { api } from "../../api";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { IGeneralResponse, IGeneral } from "./type";

const useGetGeneral = () => {
	return useQuery<IGeneralResponse, Error>({
		queryKey: ["general"],
		queryFn: async () => {
			const response = await api.get(API_URL.general);
			return response.data;
		}
	});
};

const usePostGeneral = (
	options?: Omit<UseMutationOptions<IGeneral, Error, IGeneral>, "mutationFn">
) => {
	return useMutation<IGeneral, Error, IGeneral>({
		mutationFn: async data => {
			const response = await api.post(API_URL.general, data);
			return response.data;
		},
		...options
	});
};

const usePatchGeneral = (
	options?: Omit<UseMutationOptions<IGeneral, Error, IGeneral>, "mutationFn">
) => {
	return useMutation<IGeneral, Error, IGeneral>({
		mutationFn: async data => {
			const response = await api.patch(`${API_URL.general}`, data);
			return response.data;
		},
		...options
	});
};

const useDeleteGeneral = (
	options?: Omit<UseMutationOptions<IGeneral, Error, IGeneral>, "mutationFn">
) => {
	return useMutation<IGeneral, Error, IGeneral>({
		mutationFn: async ({ id }) => {
			const response = await api.delete(`${API_URL.general}/${id}`);
			return response.data;
		},
		...options
	});
};

export { useGetGeneral, usePostGeneral, usePatchGeneral, useDeleteGeneral };
