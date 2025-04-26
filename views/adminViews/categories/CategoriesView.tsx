"use client";

import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import Logo from "@/shared/logo/Logo";
import InputField from "@/shared/inputField/InputField";
import Button from "@/shared/button/Button";
import { toast } from "react-hot-toast";
import styles from "./CategoriesView.module.scss";
import { usePostCategory, useGetCategories } from "@/app/api/hooks/categories";
import { PageLoader } from "@/shared/loaders";
import { SettingsOperationType } from "@/interfaces";
import CategoryModal from "@/shared/modals/categoryModal/CategoryModal";
import { Table } from "@/shared";

const categoriesSchema = Yup.object().shape({
	name: Yup.string().required("Name is required")
});

const initialValues = {
	name: ""
};

const CategoriesView = () => {
	const { mutateAsync: postCategory } = usePostCategory();
	const { data: categories, refetch, isFetching } = useGetCategories();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<SettingsOperationType>(
		SettingsOperationType.EDIT
	);
	const [modalId, setModalId] = useState<string>("");

	const headers = ["Name", "Slug"];

	const handleOpenModal = (title: SettingsOperationType, id: string) => {
		setOpenModal(true);
		setModalTitle(title);
		setModalId(id);
	};

	const tableData: any = categories?.data.map((category: any) => {
		return {
			id: category._id,
			Slug: category.slug,
			Name: category.name
		};
	});

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const res = await postCategory({
				name: values.name
			});
			if (res) {
				toast.success("Category created successfully");
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
		}
	};
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<Logo />
				<div className={styles.divider}></div>
				<div className={styles.title}>
					<h3>Create a new category</h3>
					<p>Input the name of the category to create.</p>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={categoriesSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<Field name="name">
								{({ field }: FieldProps) => (
									<InputField
										{...field}
										label="Name"
										placeholder="Enter name"
										className={styles.input}
										error={(touched.name && errors.name) || ""}
										type="text"
									/>
								)}
							</Field>
							<Button
								className={styles.button}
								type="submit"
								disabled={isSubmitting}
							>
								Create
							</Button>
						</Form>
					)}
				</Formik>
			</div>
			<div className={styles.categories}>
				{isFetching ? (
					<PageLoader />
				) : (
					<Table
						headers={headers}
						data={tableData}
						iconHeaders={["Rider"]}
						isLoading={isFetching}
						onEdit={handleOpenModal}
						onDelete={handleOpenModal}
					/>
				)}
			</div>
			{openModal && (
				<CategoryModal
					openModal={openModal}
					setOpenModal={setOpenModal}
					title={modalTitle}
					isLoading={false}
					id={modalId}
					refetch={refetch}
				/>
			)}
		</section>
	);
};

export default CategoriesView;
