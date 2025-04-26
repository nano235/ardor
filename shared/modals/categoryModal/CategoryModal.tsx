"use client";

import { Button, InputField, Modal } from "@/shared";
import React, { Dispatch, SetStateAction } from "react";
import styles from "./CategoryModal.module.scss";
import { PageLoader } from "@/shared/loaders";
import { SettingsOperationType } from "@/interfaces";
import * as Yup from "yup";
import { Formik, Form, Field, FieldProps } from "formik";
import { toast } from "react-hot-toast";
import {
	useDeleteCategory,
	useGetCategoryById,
	usePatchCategory
} from "@/app/api/hooks/categories";

interface Props {
	openModal: boolean;
	isLoading: boolean;
	setOpenModal: Dispatch<SetStateAction<boolean>>;
	id: string;
	title: SettingsOperationType;
	refetch: () => void;
}

const categoriesSchema = Yup.object().shape({
	name: Yup.string().required("Name is required")
});

const CategoryModal = ({
	title,
	openModal,
	setOpenModal,
	id,
	isLoading,
	refetch
}: Props) => {
	const { mutateAsync: patchCategory } = usePatchCategory(id);
	const { mutateAsync: deleteCategory, isPending: isDeleting } = useDeleteCategory();
	const { data: category } = useGetCategoryById(id);

	const initialValues = {
		name: category?.data?.name,
		slug: category?.data?.slug
	};

	const handleDelete = async () => {
		try {
			const res = await deleteCategory({ id });
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
			const res = await patchCategory({
				name: values.name || ""
			});
			if (res) {
				toast.success("Category updated successfully");
				refetch();
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
										Are you sure you want to delete this category?
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
								validationSchema={categoriesSchema}
								onSubmit={handleSubmit}
							>
								{({ errors, touched, isSubmitting, values }) => (
									<Form>
										<Field name="name">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Name"
													placeholder={
														values.name || "Enter name"
													}
													className={styles.input}
													error={
														(touched.name && errors.name) ||
														""
													}
													type="text"
													value={values.name}
												/>
											)}
										</Field>
										<Button
											className={styles.button}
											type="submit"
											disabled={isSubmitting}
										>
											Edit
										</Button>
									</Form>
								)}
							</Formik>
						)}
					</div>
				</>
			)}
		</Modal>
	);
};

export default CategoryModal;
