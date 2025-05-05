"use client";

import { Button, CustomImage, InputField, Modal, TextArea } from "@/shared";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./TestimonialModal.module.scss";
import { PageLoader } from "@/shared/loaders";
import { SettingsOperationType } from "@/interfaces";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps } from "formik";
import { toast } from "react-hot-toast";
import { ITestimonial } from "@/app/api/hooks/testimonials/type";
import { useUploadMedia } from "@/app/api/hooks/uploadFile";
import Image from "next/image";
import { useDeleteTestimonial } from "@/app/api/hooks/testimonials";
import { usePatchTestimonial } from "@/app/api/hooks/testimonials";
import { usePostTestimonial } from "@/app/api/hooks/testimonials";
import { useGetTestimonialById } from "@/app/api/hooks/testimonials";
interface Props {
	openModal: boolean;
	isLoading: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	title: SettingsOperationType;
	refetch: () => void;
	id?: string;
}

interface UploadResult {
	url: string;
	public_id: string;
	resource_type: string;
}

const TestimonialModal = ({
	openModal,
	isLoading,
	setOpenModal,
	title,
	refetch,
	id
}: Props) => {
	const { mutateAsync: postTestimonial } = usePostTestimonial();
	const { data: testimonialData } = useGetTestimonialById(id || "");
	const { mutateAsync: patchTestimonial } = usePatchTestimonial(id || "");
	const { mutateAsync: deleteTestimonial, isPending: isDeleting } =
		useDeleteTestimonial();
	const { mutateAsync: postUploadFile } = useUploadMedia();
	const [displayedImage, setDisplayedImage] = useState<File[] | null>(null);

	const initialValues: ITestimonial = {
		name: testimonialData?.data?.name || "",
		role: testimonialData?.data?.role || "",
		description: testimonialData?.data?.description || "",
		image: testimonialData?.data?.image || ""
	};

	const testimonialSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		role: Yup.string().required("Role is required"),
		description: Yup.string().required("Description is required")
		// image: Yup.string().required("Image is required")
	});

	const handleDelete = async () => {
		try {
			const res = await deleteTestimonial({ id: id || "" });
			if (res) {
				toast.success("Testimonial deleted successfully");
				refetch();
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { data: { message: string } })?.data
							?.message || "Testimonial deletion failed"
					: "Testimonial deletion failed";
			toast.error(errorMessage);
		} finally {
			setOpenModal(false);
		}
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const media: {
				images: string[];
			} = {
				images: []
			};
			if (displayedImage && displayedImage.length > 0) {
				try {
					const imgUploadRes = await postUploadFile(displayedImage);
					if (!imgUploadRes || !imgUploadRes.length) {
						throw new Error("Failed to upload images");
					}
					media.images = imgUploadRes.map((upload: UploadResult) => upload.url);
				} catch (uploadError: Error | unknown) {
					const errorMessage =
						uploadError instanceof Error
							? uploadError.message
							: "Failed to upload images";
					toast.error(errorMessage);
					return;
				}
			}
			const payload = {
				...values,
				image: media.images[0]
			};
			if (title === SettingsOperationType.EDIT) {
				const res = await patchTestimonial(payload);
				if (res) {
					toast.success("Testimonial updated successfully");
					refetch();
					setOpenModal(false);
				}
			} else {
				const res = await postTestimonial(payload);
				if (res) {
					toast.success("Testimonial created successfully");
					refetch();
					setOpenModal(false);
				}
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { data: { message: string } })?.data
							?.message || "Testimonial creation failed"
					: "Testimonial creation failed";
			toast.error(errorMessage);
		}
	};

	const deleteImage = (image: File) => {
		const localArr = displayedImage;
		if (localArr) {
			const filteredImages = localArr.filter(item => item.name !== image.name);
			setDisplayedImage(filteredImages);
		}
	};

	const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const validFiles = Array.from(files).filter(file => file instanceof File);
			// if (validFiles[0] && validFiles[0].size > MAX_FILE_SIZE) {
			// 	return toast.error(
			// 		`${validFiles[0].name} exceeds max size of ${
			// 			MAX_FILE_SIZE / 1048576
			// 		}mb`
			// 	);
			// }
			if (validFiles.length > 0) {
				setDisplayedImage([validFiles[0]]);
			} else {
				toast.error("No valid File objects were selected");
			}
		} else {
			toast.error("No files selected");
		}
	};

	return (
		<Modal
			title={`${title}`}
			openModal={openModal}
			setOpenModal={setOpenModal}
			className={`${styles.modal} ${
				title === SettingsOperationType.BAN && styles.delete
			}`}
		>
			{isLoading ? (
				<PageLoader />
			) : (
				<>
					<div className={styles.body}>
						{title === SettingsOperationType.DELETE ? (
							<>
								<div className={styles.text}>
									<p>
										Are you sure you want to delete this Testimonial?
										This action cannot be undone.
									</p>
								</div>
								<Button
									className={styles.button}
									type="submit"
									disabled={isDeleting}
									onClick={handleDelete}
								>
									Delete
								</Button>
							</>
						) : (
							<Formik
								initialValues={initialValues}
								validationSchema={testimonialSchema}
								onSubmit={handleSubmit}
							>
								{({ errors, touched, isSubmitting }) => {
									console.log(errors);
									return (
										<Form>
											<Field name="name">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Name"
														placeholder={
															testimonialData?.data.name ||
															"Enter Reviewer's name"
														}
														className={styles.input}
														error={
															(touched.name &&
																errors.name) ||
															""
														}
														type="text"
													/>
												)}
											</Field>
											<Field name="description">
												{({ field }: FieldProps) => (
													<TextArea
														{...field}
														label="Description"
														placeholder={
															testimonialData?.data
																.description ||
															"Enter testimonial"
														}
														className={styles.input}
														error={
															(touched.description &&
																errors.description) ||
															""
														}
													/>
												)}
											</Field>
											<Field name="role">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Role"
														placeholder={
															testimonialData?.data.role ||
															"Enter Reviewer's role"
														}
														className={styles.input}
														error={
															(touched.role &&
																errors.role) ||
															""
														}
														type="text"
													/>
												)}
											</Field>
											<div className={styles.image_container}>
												<div
													className={styles.addimage_container}
												>
													<input
														type="file"
														className={styles.file_input}
														onChange={handleIconChange}
														accept=".jpeg, .jpg, .png, .gif"
														multiple
														// required
													/>
													<div className={styles.add_image}>
														<Image
															src="/svgs/icon-add-image.svg"
															alt=""
															fill
															sizes="100vw"
														/>
													</div>
													<div className={styles.text}>
														<p>
															Drop your images here, or{" "}
															<span>click to upload</span>
														</p>
														<h5>
															1600 x 1200 (4:3) recommended,
															up to 10mb each
														</h5>
													</div>
												</div>
												<div className={styles.image_row}>
													{displayedImage &&
														displayedImage.length > 0 && (
															<div
																key={
																	displayedImage[0].name
																}
																className={styles.image}
															>
																<CustomImage
																	src={URL.createObjectURL(
																		displayedImage[0]
																	)}
																	alt=""
																	fill
																	sizes="100vw"
																/>
																<div
																	className={
																		styles.closeModal_container
																	}
																	onClick={() =>
																		deleteImage(
																			displayedImage[0]
																		)
																	}
																>
																	<div
																		className={
																			styles.closeModal
																		}
																	>
																		<span></span>
																		<span></span>
																	</div>
																</div>
															</div>
														)}
												</div>
											</div>
											<Button
												className={styles.button}
												type="submit"
												disabled={isSubmitting}
												// onClick={() => resetForm()}
											>
												Create
											</Button>
										</Form>
									);
								}}
							</Formik>
						)}
					</div>
				</>
			)}
		</Modal>
	);
};

export default TestimonialModal;
