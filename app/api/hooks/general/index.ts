import { api } from "../../api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { IGeneral } from "./type";

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

export { usePostGeneral, usePatchGeneral, useDeleteGeneral };
