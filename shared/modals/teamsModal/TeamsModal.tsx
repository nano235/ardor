"use client";

import { Button, CustomImage, InputField, Modal } from "@/shared";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./TeamsModal.module.scss";
import { PageLoader } from "@/shared/loaders";
import { SettingsOperationType } from "@/interfaces";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps } from "formik";
import { toast } from "react-hot-toast";
// import { ITeam } from "@/app/api/hooks/team/types";
import {
	useDeleteTeam,
	useGetTeamsBySlug,
	usePatchTeam,
	usePostTeam
} from "@/app/api/hooks/team";
import { useUploadMedia } from "@/app/api/hooks/uploadFile";
import Image from "next/image";

interface Props {
	openModal: boolean;
	isLoading: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	slug: string;
	title: SettingsOperationType;
	refetch: () => void;
	id?: string;
}

interface UploadResult {
	url: string;
	public_id: string;
	resource_type: string;
}

const teamsSchema = Yup.object().shape({
	name: Yup.string().required("Name is required"),
	role: Yup.string().required("Role is required")
});

const TeamsModal = ({
	openModal,
	isLoading,
	setOpenModal,
	slug,
	title,
	refetch,
	id
}: Props) => {
	const { data: teamData } = useGetTeamsBySlug(slug);
	const { mutateAsync: postTeam } = usePostTeam();
	const { mutateAsync: patchTeam } = usePatchTeam(id || "");
	const { mutateAsync: deleteTeam, isPending: isDeleting } = useDeleteTeam();
	const { mutateAsync: postUploadFile } = useUploadMedia();

	const [displayedImage, setDisplayedImage] = useState<File | string>(
		teamData?.data.avatar || ""
	);

	const initialValues = {
		name: teamData?.data.name || "",
		role: teamData?.data.role || ""
	};

	const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const validFiles = Array.from(files).filter(file => file instanceof File);
			if (validFiles.length > 0) {
				setDisplayedImage(validFiles[0]);
			} else {
				toast.error("No valid File objects were selected");
			}
		} else {
			toast.error("No files selected");
		}
	};

	const handleDelete = async () => {
		try {
			const res = await deleteTeam({ id });
			if (res) {
				toast.success("Category deleted successfully");
				refetch();
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { data: { message: string } })?.data
							?.message || "Category creation failed"
					: "Category creation failed";
			toast.error(errorMessage);
		} finally {
			setOpenModal(false);
		}
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			let image: string = "";
			if (displayedImage && typeof displayedImage !== "string") {
				try {
					const imgUploadRes = await postUploadFile([displayedImage]);
					if (!imgUploadRes || !imgUploadRes.length) {
						throw new Error("Failed to upload images");
					}
					image = imgUploadRes.map((upload: UploadResult) => upload.url);
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
				name: values.name,
				role: values.role,
				avatar: image[0]
			};
			if (title === SettingsOperationType.EDIT) {
				const res = await patchTeam(payload);
				if (res) {
					toast.success("Article updated successfully");
					refetch();
					setOpenModal(false);
				}
			} else {
				const res = await postTeam(payload);
				if (res) {
					toast.success("Article created successfully");
					refetch();
					setOpenModal(false);
				}
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { data: { message: string } })?.data
							?.message || "Category creation failed"
					: "Category creation failed";
			console.log(
				"error occurred....",
				errorMessage,
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { status: number })?.status
					: null
			);
			toast.error(errorMessage);
		} finally {
			setOpenModal(false);
		}
	};

	const deleteImage = () => {
		setDisplayedImage("");
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
										Are you sure you want to delete this Article? This
										action cannot be undone.
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
								validationSchema={teamsSchema}
								onSubmit={handleSubmit}
								enableReinitialize
							>
								{({
									errors,
									touched,
									isSubmitting,
									// setFieldValue,
									values
								}) => {
									return (
										<Form>
											<Field name="name">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Name"
														placeholder={"Enter Name"}
														className={styles.input}
														error={
															(touched.name &&
																errors.name) ||
															""
														}
														value={values.name}
														type="text"
													/>
												)}
											</Field>
											<Field name="role">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Role"
														placeholder={"Enter role"}
														className={styles.input}
														error={
															(touched.role &&
																errors.role) ||
															""
														}
														value={values.role}
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
												{displayedImage && (
													<div className={styles.image_row}>
														<div className={styles.image}>
															<CustomImage
																src={
																	typeof displayedImage ===
																	"string"
																		? displayedImage
																		: URL.createObjectURL(
																				displayedImage
																		  )
																}
																alt=""
																fill
																sizes="100vw"
															/>
															<div
																className={
																	styles.closeModal_container
																}
																onClick={() =>
																	deleteImage()
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
													</div>
												)}
											</div>
											{/* <div className={styles.image_container}>
												<div
													className={styles.addimage_container}
												>
													<input
														type="file"
														className={styles.file_input}
														onChange={
															handleVideoThumbnailChange
														}
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
															Drop your thumbnail here, or{" "}
															<span>click to upload</span>
														</p>
														<h5>
															1600 x 1200 (4:3) recommended,
															up to 10mb each
														</h5>
													</div>
												</div>
												<div className={styles.image_row}>
													{displayedVideoThumbnail && (
														<div
															key={
																typeof displayedVideoThumbnail ===
																"string"
																	? displayedVideoThumbnail
																	: displayedVideoThumbnail.name
															}
															className={styles.image}
														>
															<CustomImage
																src={
																	typeof displayedVideoThumbnail ===
																	"string"
																		? displayedVideoThumbnail
																		: URL.createObjectURL(
																				displayedVideoThumbnail
																		  )
																}
																alt=""
																fill
																sizes="100vw"
															/>
															<div
																className={
																	styles.closeModal_container
																}
																// onClick={() =>
																// 	deleteVideoThumbnail(displayedVideoThumbnail)
																// }
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
											</div> */}
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

export default TeamsModal;
