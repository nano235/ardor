import { api } from "../../api";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { IUserResponse, IUserRequest, IUser } from "./types";
// ----------------------------------------------

const usePostUserSignIn = (
	options?: Omit<UseMutationOptions<IUserResponse, Error, IUserRequest>, "mutationFn">
) =>
	useMutation<IUserResponse, Error, IUserRequest>({
		mutationFn: async props =>
			(
				await api.post(API_URL.signIn, {
					...props
				})
			).data,
		...options
	});

const usePostUserRegister = (
	options?: Omit<UseMutationOptions<IUserResponse, Error, IUserRequest>, "mutationFn">
) =>
	useMutation<IUserResponse, Error, IUserRequest>({
		mutationFn: async props =>
			(
				await api.post(API_URL.register, {
					...props
				})
			).data,
		...options
	});

// ----------------------------------------------

const useGetVerifyToken = () => {
	return useQuery<IUser, Error>({
		queryKey: ["verifyToken"],
		queryFn: async () => {
			const response = await api.get(`${API_URL.verifyToken}`);
			return response.data;
		},
		enabled: true,
		refetchOnMount: true,
		retry: false
	});
};

const usePatchEditUser = (
	userId: string,
	options?: Omit<UseMutationOptions<IUserResponse, Error, IUserRequest>, "mutationFn">
) =>
	useMutation<IUserResponse, Error, IUserRequest>({
		mutationFn: async props =>
			(
				await api.patch(`${API_URL.user}/${userId}`, {
					...props
				})
			).data,
		...options
	});
export { usePostUserSignIn, useGetVerifyToken, usePostUserRegister, usePatchEditUser };
