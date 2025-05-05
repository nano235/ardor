"use client";

import { Button, InputField, Modal, TextArea } from "@/shared";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./CareersModal.module.scss";
import { PageLoader } from "@/shared/loaders";
import { SettingsOperationType } from "@/interfaces";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps } from "formik";
import { toast } from "react-hot-toast";
import {
	useDeleteCareer,
	useGetCareerById,
	usePatchCareer,
	usePostCareer
} from "@/app/api/hooks/careers";
import { ICareer } from "@/app/api/hooks/careers/types";

interface Props {
	openModal: boolean;
	isLoading: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	title: SettingsOperationType;
	refetch: () => void;
	id?: string;
}

const CareersModal = ({ openModal, setOpenModal, title, refetch, id }: Props) => {
	const { data: careerData, isFetching } = useGetCareerById(id || "");
	const { mutateAsync: postCareer } = usePostCareer();
	const { mutateAsync: patchCareer } = usePatchCareer(id || "");
	const { mutateAsync: deleteCareer, isPending: isDeleting } = useDeleteCareer();

	const initialValues: ICareer = {
		title: careerData?.data?.title || "",
		description: careerData?.data?.description || "",
		location: careerData?.data?.location || "",
		jobType: careerData?.data?.jobType || ""
	};

	const testimonialSchema = Yup.object().shape({
		title: Yup.string().required("Title is required"),
		description: Yup.string().required("Description is required"),
		location: Yup.string().required("Location is required"),
		jobType: Yup.string().required("Job Type is required")
	});
	const handleDelete = async () => {
		try {
			const res = await deleteCareer({ id: id || "" });
			if (res) {
				toast.success("Career post deleted successfully");
				refetch();
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { data: { message: string } })?.data
							?.message || "Career post deletion failed"
					: "Career post deletion failed";
			toast.error(errorMessage);
		} finally {
			setOpenModal(false);
		}
	};

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			if (title === SettingsOperationType.EDIT) {
				const res = await patchCareer(values);
				if (res) {
					toast.success("Career post updated successfully");
					refetch();
					setOpenModal(false);
				}
			} else {
				const res = await postCareer(values);
				if (res) {
					toast.success("Career post created successfully");
					refetch();
					setOpenModal(false);
				}
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { data: { message: string } })?.data
							?.message || "Career post creation failed"
					: "Career post creation failed";
			toast.error(errorMessage);
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
			{isFetching ? (
				<PageLoader />
			) : (
				<>
					<div className={styles.body}>
						{title === SettingsOperationType.DELETE ? (
							<>
								<div className={styles.text}>
									<p>
										Are you sure you want to delete this Career post?
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
											<Field name="title">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Title"
														placeholder={
															careerData?.data.title ||
															"Enter Career Title"
														}
														className={styles.input}
														error={
															(touched.title &&
																errors.title) ||
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
															careerData?.data
																.description ||
															"Enter Career Description"
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
											<Field name="location">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Location"
														placeholder={
															careerData?.data.location ||
															"Enter Career Location"
														}
														className={styles.input}
														error={
															(touched.location &&
																errors.location) ||
															""
														}
														type="text"
													/>
												)}
											</Field>
											<Field name="jobType">
												{({ field }: FieldProps) => (
													<InputField
														{...field}
														label="Job Type"
														placeholder={
															careerData?.data.jobType ||
															"Enter Job Type"
														}
														className={styles.input}
														error={
															(touched.jobType &&
																errors.jobType) ||
															""
														}
														type="text"
													/>
												)}
											</Field>
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

export default CareersModal;
