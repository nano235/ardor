import { api } from "../../api";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { IVideos, IVideosData } from "./types";

const useGetVideos = () => {
	return useQuery<IVideosData, Error>({
		queryKey: ["videos"],
		queryFn: async () => {
			const response = await api.get(API_URL.videos);
			return response.data;
		}
	});
};

const usePostVideos = (
	options?: Omit<UseMutationOptions<IVideos, Error, IVideos>, "mutationFn">
) => {
	return useMutation<IVideos, Error, IVideos>({
		mutationFn: async data => {
			const response = await api.post(API_URL.videos, data);
			return response.data;
		},
		...options
	});
};

const usePatchVideos = (
	options?: Omit<UseMutationOptions<IVideos, Error, IVideos>, "mutationFn">
) => {
	return useMutation<IVideos, Error, IVideos>({
		mutationFn: async data => {
			const response = await api.patch(`${API_URL.videos}`, data);
			return response.data;
		},
		...options
	});
};

const useDeleteVideos = (
	options?: Omit<UseMutationOptions<IVideos, Error, IVideos>, "mutationFn">
) => {
	return useMutation<IVideos, Error, IVideos>({
		mutationFn: async () => {
			const response = await api.delete(`${API_URL.videos}`);
			return response.data;
		},
		...options
	});
};

export { usePostVideos, usePatchVideos, useDeleteVideos, useGetVideos };
