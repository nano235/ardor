import { api } from "../../api";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "../../url";
import axios from "axios";

export interface iUploadImagesResp {
	imageUrls: string[];
}

const useUploadFiles = () =>
	useMutation<iUploadImagesResp, Error, File[]>({
		mutationFn: async props => {
			const formData = new FormData();
			props.forEach(file => {
				formData.append(`images`, file); // Append each file with a unique key
			});
			return (
				await api.post(API_URL.uploadFiles, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
			).data;
		}
	});

const useUploadMedia = () =>
	useMutation({
		mutationFn: async (files: File[]) => {
			const formData = new FormData();
			files.forEach(file => formData.append("file", file));

			const response = await axios.post("/api/upload", formData, {
				headers: { "Content-Type": "multipart/form-data" }
			});

			return response.data.uploads; // [{ url, public_id, resource_type }]
		}
	});

export { useUploadFiles, useUploadMedia };
