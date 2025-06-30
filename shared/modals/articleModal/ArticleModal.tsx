"use client";

import {
	AdvancedSelect,
	Button,
	CustomImage,
	InputField,
	Modal,
	TextArea
} from "@/shared";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./ArticleModal.module.scss";
import { PageLoader } from "@/shared/loaders";
import { SettingsOperationType } from "@/interfaces";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps } from "formik";
import { toast } from "react-hot-toast";
import { IArticle } from "@/app/api/hooks/articles/types";
import {
	useDeleteArticle,
	useGetArticlesBySlug,
	usePatchArticle,
	usePostArticle
} from "@/app/api/hooks/articles";
import { useGetCategories } from "@/app/api/hooks/categories";
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

const categoriesSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	categories: Yup.array().of(Yup.string()).required("Categories are required"),
	featured: Yup.boolean(),
	client: Yup.string().required("Client is required"),
	agency: Yup.string(),
	productionTime: Yup.string(),
	videoType: Yup.string(),
	challenges: Yup.array().of(Yup.string()),
	solutions: Yup.array().of(Yup.string()),
	credit: Yup.string(),
	website: Yup.string(),
	attendance: Yup.string(),
	projectType: Yup.string(),
	metrics: Yup.string()
});

const ArticleModal = ({
	openModal,
	isLoading,
	setOpenModal,
	slug,
	title,
	refetch,
	id
}: Props) => {
	const { data: articleData } = useGetArticlesBySlug(slug);
	const { mutateAsync: postArticle } = usePostArticle();
	const { data: categories } = useGetCategories();
	const { mutateAsync: patchArticle } = usePatchArticle(id || "");
	const { mutateAsync: deleteArticle, isPending: isDeleting } = useDeleteArticle();
	const { mutateAsync: postUploadFile } = useUploadMedia();

	const article = articleData?.data as IArticle;

	const [displayedImages, setDisplayedImages] = useState<(File | string)[]>(
		article?.images || []
	);
	const [displayedVideos, setDisplayedVideos] = useState<string>(
		article?.videos?.length ? article?.videos[0].url : ""
	);

	const [displayedVideoThumbnail, setDisplayedVideoThumbnail] = useState<File | string>(
		article?.videos![0].thumbnail || ""
	);

	const initialValues: IArticle = {
		title: article?.title,
		description: article?.description,
		categories: article?.categories,
		featured: article?.featured,
		client: article?.client,
		agency: article?.agency,
		productionTime: article?.productionTime,
		videoType: article?.videoType,
		challenges: article?.challenges,
		solutions: article?.solutions,
		images: article?.images,
		videos: article?.videos,
		_id: article?._id,
		credit: article?.credit,
		website: article?.website,
		attendance: article?.attendance,
		projectType: article?.projectType,
		metrics: article?.metrics
	};

	useEffect(() => {
		if (articleData) {
			setDisplayedImages(article?.images as string[]);
			setDisplayedVideoThumbnail(article?.videos![0].thumbnail);
		}
	}, [article, articleData]);

	const handleDelete = async () => {
		try {
			const res = await deleteArticle({ id: id || "" });
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
			const media: {
				images: string[];
				videos: string[];
				thumbnail: string;
			} = {
				images: [],
				videos: [],
				thumbnail: ""
			};
			if (displayedImages && displayedImages.length > 0) {
				try {
					const filesToUpload = displayedImages.filter(
						img => img instanceof File
					) as File[];
					const imgUploadRes = await postUploadFile(filesToUpload);
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
			if (displayedVideoThumbnail) {
				try {
					if (typeof displayedVideoThumbnail === "string") return;
					const videoThumbnailUploadRes = await postUploadFile([
						displayedVideoThumbnail
					]);
					if (!videoThumbnailUploadRes || !videoThumbnailUploadRes.length) {
						throw new Error("Failed to upload video thumbnail");
					}
					media.thumbnail = videoThumbnailUploadRes[0].url;
				} catch (uploadError: Error | unknown) {
					const errorMessage =
						uploadError instanceof Error
							? uploadError.message
							: "Failed to upload video thumbnail";
					toast.error(errorMessage);
					return;
				}
			}
			const payload = {
				title: values.title,
				description: values.description,
				categories: values.categories,
				featured: values.featured,
				client: values.client,
				agency: values.agency,
				images: media.images,
				videos: [{ url: displayedVideos, thumbnail: media.thumbnail }],
				challenges: values.challenges,
				solutions: values.solutions,
				productionTime: values.productionTime,
				videoType: values.videoType,
				credit: values.credit,
				website: values.website,
				attendance: values.attendance,
				projectType: values.projectType,
				metrics: values.metrics
			};
			if (title === SettingsOperationType.EDIT) {
				const res = await patchArticle(payload);
				if (res) {
					toast.success("Article updated successfully");
					refetch();
					setOpenModal(false);
				}
			} else {
				const res = await postArticle(payload);
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
		}
	};

	const deleteImage = (image: File | string) => {
		setDisplayedImages(prev =>
			prev.filter(item =>
				typeof item === "string" && typeof image === "string"
					? item !== image
					: typeof item !== "string" && typeof image !== "string"
					? item.name !== image.name
					: true
			)
		);
	};

	const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const validFiles = Array.from(files).filter(file => file instanceof File);
			if (validFiles.length > 0) {
				setDisplayedImages(prev => [...prev, ...validFiles]);
			} else {
				toast.error("No valid File objects were selected");
			}
		} else {
			toast.error("No files selected");
		}
	};

	const handleVideoThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const validFiles = Array.from(files).filter(file => file instanceof File);
			if (validFiles.length > 0) {
				setDisplayedVideoThumbnail(validFiles[0]);
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
								validationSchema={categoriesSchema}
								onSubmit={handleSubmit}
								enableReinitialize
							>
								{({
									errors,
									touched,
									isSubmitting,
									setFieldValue,
									values
								}) => {
									return (
										<Form>
											<Field name="title">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Title"
														placeholder={
															article?.title ||
															"Enter title"
														}
														className={styles.input}
														error={
															(touched.title &&
																errors.title) ||
															""
														}
														value={values.title}
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
															article?.description ||
															"Enter description"
														}
														className={styles.input}
														error={
															(touched.description &&
																errors.description) ||
															""
														}
														value={values.description}
													/>
												)}
											</Field>
											<Field name="categories">
												{({ field }: FieldProps) => (
													<AdvancedSelect
														{...field}
														label="Category"
														wrapperClassName={styles.input}
														option="value"
														defaultOption={
															categories?.data.find(
																category =>
																	category._id ===
																	article
																		?.categories?.[0]
																		._id
															)?.name || "Enter Categories"
														}
														options={categories?.data || []}
														onOptionChange={option => {
															setFieldValue("categories", [
																option?._id
															]);
														}}
														error={
															(touched.categories &&
																errors.categories) ||
															""
														}
													/>
												)}
											</Field>
											{/* <Field name="featured">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Featured (optional)"
														placeholder={
															article?.featured
																? "True"
																: "False"
														}
													/>
												)}
											</Field> */}
											<Field name="client">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Client"
														placeholder={
															article?.client ||
															"Enter client"
														}
														className={styles.input}
														error={
															(touched.client &&
																errors.client) ||
															""
														}
														value={values.client}
														type="text"
													/>
												)}
											</Field>
											<Field name="credit">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Credit (optional)"
														placeholder={
															article?.credit ||
															"Enter credit"
														}
														className={styles.input}
														error={
															(touched.credit &&
																errors.credit) ||
															""
														}
														value={values.credit}
													/>
												)}
											</Field>
											<Field name="website">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Website (optional)"
														placeholder={
															article?.website ||
															"Enter website"
														}
														className={styles.input}
														error={
															(touched.website &&
																errors.website) ||
															""
														}
														value={values.website}
													/>
												)}
											</Field>
											<Field name="attendance">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Attendance (optional)"
														placeholder={
															article?.attendance ||
															"Enter attendance"
														}
														className={styles.input}
														error={
															(touched.attendance &&
																errors.attendance) ||
															""
														}
														value={values.attendance}
													/>
												)}
											</Field>
											<Field name="projectType">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Project Type (optional)"
														placeholder={
															article?.projectType ||
															"Enter project type"
														}
														className={styles.input}
														error={
															(touched.projectType &&
																errors.projectType) ||
															""
														}
														value={values.projectType}
													/>
												)}
											</Field>
											<Field name="metrics">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Metrics (optional)"
														placeholder={
															article?.metrics ||
															"Enter metrics"
														}
														className={styles.input}
														error={
															(touched.metrics &&
																errors.metrics) ||
															""
														}
														value={values.metrics}
													/>
												)}
											</Field>
											<Field name="agency">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Agency (optional)"
														placeholder={
															article?.agency ||
															"Enter agency"
														}
														className={styles.input}
														error={
															(touched.agency &&
																errors.agency) ||
															""
														}
														value={values.agency}
													/>
												)}
											</Field>
											<Field name="productionTime">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Production Time (optional)"
														placeholder={
															article?.productionTime ||
															"Enter production time"
														}
														className={styles.input}
														error={
															(touched.productionTime &&
																errors.productionTime) ||
															""
														}
														value={values.productionTime}
													/>
												)}
											</Field>
											<Field name="videoType">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Video Type (optional)"
														placeholder={
															article?.videoType ||
															"Enter video type"
														}
														className={styles.input}
														error={
															(touched.videoType &&
																errors.videoType) ||
															""
														}
														value={values.videoType}
													/>
												)}
											</Field>
											{/* <Field name="challenges">
												{({ field }: FieldProps) => (
													<TextArea
														{...field}
														label="Challenges"
														placeholder={
															article?.challenges?.join(
																". "
															) ||
															"Enter challenges (use . for each new item)"
														}
														className={styles.input}
														error={
															(touched.challenges &&
																errors.challenges) ||
															""
														}
														value={
															Array.isArray(field.value)
																? field.value.join(". ")
																: ""
														} // Removed the extra period at the end
														onChange={e => {
															// Get the raw input value
															const inputValue =
																e.target.value;

															// Only split by period if the input contains periods
															if (
																inputValue.includes(".")
															) {
																const challengesArray =
																	inputValue
																		.split(".")
																		.map(item =>
																			item.trim()
																		)
																		.filter(
																			item =>
																				item !==
																				""
																		);

																setFieldValue(
																	"challenges",
																	challengesArray
																);
															} else {
																// If no periods, treat entire input as one item
																setFieldValue(
																	"challenges",
																	inputValue
																		? [inputValue]
																		: []
																);
															}
														}}
													/>
												)}
											</Field>
											<Field name="solutions">
												{({ field }: FieldProps) => (
													<TextArea
														{...field}
														label="Solutions"
														placeholder={
															article?.solutions?.join(
																". "
															) ||
															"Enter solutions (use . for each new item)"
														}
														className={styles.input}
														error={
															(touched.solutions &&
																errors.solutions) ||
															""
														}
														value={
															Array.isArray(field.value)
																? field.value.join(". ")
																: ""
														}
														onChange={e => {
															const inputValue =
																e.target.value;

															if (
																inputValue.includes(".")
															) {
																const solutionsArray =
																	inputValue
																		.split(".")
																		.map(item =>
																			item.trim()
																		)
																		.filter(
																			item =>
																				item !==
																				""
																		);

																setFieldValue(
																	"solutions",
																	solutionsArray
																);
															} else {
																setFieldValue(
																	"solutions",
																	inputValue
																		? [inputValue]
																		: []
																);
															}
														}}
													/>
												)}
											</Field> */}
											<Field name="videoUrl">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Video url"
														placeholder={
															article?.videos?.[0]?.url ||
															"Enter video url"
														}
														className={styles.input}
														onChange={e => {
															setFieldValue("videos", [
																{ url: e.target.value }
															]);
															setDisplayedVideos(
																e.target.value
															);
														}}
														error={
															(touched.videos &&
																errors.videos) ||
															""
														}
														value={values?.videos?.[0]?.url}
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
													{displayedImages.map(
														(displayedImage, idx) => (
															<div
																key={
																	typeof displayedImage ===
																	"string"
																		? displayedImage
																		: displayedImage.name +
																		  idx
																}
																className={styles.image}
															>
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
																		deleteImage(
																			displayedImage
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
														)
													)}
												</div>
											</div>
											<div className={styles.image_container}>
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

export default ArticleModal;
