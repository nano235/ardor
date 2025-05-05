import { api } from "../../api";
import { useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../url";
import { ITestimonial, ITestimonialResponse, IEditTestimonial } from "./type";

const useGetTestimonials = () => {
	return useQuery<ITestimonialResponse, Error>({
		queryKey: ["testimonials"],
		queryFn: async () => {
			const response = await api.get(API_URL.testimonial);
			return response.data;
		}
	});
};

const useGetTestimonialById = (id: string) => {
	return useQuery<IEditTestimonial, Error>({
		queryKey: ["testimonials", id],
		queryFn: async () => {
			const response = await api.get(`${API_URL.testimonial}/${id}`);
			return response.data;
		},
		enabled: !!id
	});
};

const usePostTestimonial = (
	options?: Omit<UseMutationOptions<ITestimonial, Error, ITestimonial>, "mutationFn">
) => {
	return useMutation<ITestimonial, Error, ITestimonial>({
		mutationFn: async data => {
			const response = await api.post(API_URL.testimonial, data);
			return response.data;
		},
		...options
	});
};

const usePatchTestimonial = (
	id: string,
	options?: Omit<UseMutationOptions<ITestimonial, Error, ITestimonial>, "mutationFn">
) => {
	return useMutation<ITestimonial, Error, ITestimonial>({
		mutationFn: async data => {
			const response = await api.patch(`${API_URL.testimonial}/${id}`, data);
			return response.data;
		},
		...options
	});
};

const useDeleteTestimonial = (
	options?: Omit<UseMutationOptions<ITestimonial, Error, ITestimonial>, "mutationFn">
) => {
	return useMutation<ITestimonial, Error, ITestimonial>({
		mutationFn: async ({ id }) => {
			const response = await api.delete(`${API_URL.testimonial}/${id}`);
			return response.data;
		},
		...options
	});
};

export {
	useGetTestimonials,
	useGetTestimonialById,
	usePostTestimonial,
	usePatchTestimonial,
	useDeleteTestimonial
};
