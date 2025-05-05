import { api } from "../../api";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { ICareer, ICareerResponse, IEditCareer } from "./types";

const useGetCareers = () => {
	return useQuery<ICareerResponse, Error>({
		queryKey: ["careers"],
		queryFn: async () => {
			const response = await api.get(API_URL.career);
			return response.data;
		}
	});
};

const useGetCareerById = (id: string) => {
	return useQuery<IEditCareer, Error>({
		queryKey: ["careers", id],
		queryFn: async () => {
			const response = await api.get(`${API_URL.career}/${id}`);
			return response.data;
		},
		enabled: !!id
	});
};

const usePostCareer = (
	options?: Omit<UseMutationOptions<ICareer, Error, ICareer>, "mutationFn">
) => {
	return useMutation<ICareer, Error, ICareer>({
		mutationFn: async data => {
			const response = await api.post(API_URL.career, data);
			return response.data;
		},
		...options
	});
};

const usePatchCareer = (
	id: string,
	options?: Omit<UseMutationOptions<ICareer, Error, ICareer>, "mutationFn">
) => {
	return useMutation<ICareer, Error, ICareer>({
		mutationFn: async data => {
			const response = await api.patch(`${API_URL.career}/${id}`, data);
			return response.data;
		},
		...options
	});
};

const useDeleteCareer = (
	options?: Omit<UseMutationOptions<ICareer, Error, ICareer>, "mutationFn">
) => {
	return useMutation<ICareer, Error, ICareer>({
		mutationFn: async ({ id }) => {
			const response = await api.delete(`${API_URL.career}/${id}`);
			return response.data;
		},
		...options
	});
};

export {
	useGetCareers,
	useGetCareerById,
	usePostCareer,
	usePatchCareer,
	useDeleteCareer
};
