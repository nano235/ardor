import { api } from "../../api";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { ITeam, ITeamResponse, IEditTeam } from "./types";

const useGetTeams = () => {
	return useQuery<ITeamResponse, Error>({
		queryKey: ["teams"],
		queryFn: async () => {
			const response = await api.get(API_URL.team);
			return response.data;
		}
	});
};

const useGetTeamsBySlug = (slug: string) => {
	return useQuery<{ data: ITeam }, Error>({
		queryKey: ["teams", slug],
		queryFn: async () => {
			const response = await api.get(`${API_URL.team}/${slug}`);
			return response.data;
		}
	});
};

const useGetTeamById = (id: string) => {
	return useQuery<IEditTeam, Error>({
		queryKey: ["teams", id],
		queryFn: async () => {
			const response = await api.get(`${API_URL.team}/id/${id}`);
			return response.data;
		},
		enabled: !!id
	});
};

const usePostTeam = (
	options?: Omit<UseMutationOptions<ITeam, Error, ITeam>, "mutationFn">
) => {
	return useMutation<ITeam, Error, ITeam>({
		mutationFn: async props => {
			const response = await api.post(API_URL.team, {
				...props
			});
			return response.data;
		},
		...options
	});
};

const usePatchTeam = (
	id: string,
	options?: Omit<UseMutationOptions<ITeam, Error, ITeam>, "mutationFn">
) => {
	return useMutation<ITeam, Error, ITeam>({
		mutationFn: async props => {
			const response = await api.patch(`${API_URL.team}/${id}`, {
				...props
			});
			return response.data;
		},
		...options
	});
};

const useDeleteTeam = (
	options?: Omit<UseMutationOptions<ITeam, Error, ITeam>, "mutationFn">
) => {
	return useMutation<ITeam, Error, ITeam>({
		mutationFn: async ({ id }) => {
			const response = await api.delete(`${API_URL.team}/${id}`);
			return response.data;
		},
		...options
	});
};
export {
	useGetTeams,
	usePostTeam,
	useGetTeamsBySlug,
	useGetTeamById,
	usePatchTeam,
	useDeleteTeam
};
