"use client";

import { useGetTestimonials } from "@/app/api/hooks/testimonials";
import { ITestimonial } from "@/app/api/hooks/testimonials/type";
import { SettingsOperationType } from "@/interfaces";
import React, { useState } from "react";
import styles from "./Testimonials.module.scss";
import { Table } from "@/shared";
import { Button } from "@/shared";
import { PageLoader } from "@/shared/loaders";
import TestimonialModal from "@/shared/modals/testimonialModal/TestimonialModal";

const Testimonials = () => {
	const { data: testimonialData, refetch, isFetching } = useGetTestimonials();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<SettingsOperationType>(
		SettingsOperationType.EDIT
	);
	const [modalId, setModalId] = useState<string>("");
	const headers = ["Name", "Role", "Description"];

	const handleOpenModal = (title: SettingsOperationType, id: string) => {
		setOpenModal(true);
		setModalTitle(title);
		setModalId(id);
	};

	const testimonials = testimonialData?.data as ITestimonial[];

	const tableData: ITestimonial[] = testimonials?.map((testimonial: ITestimonial) => {
		return {
			id: testimonial._id,
			Name: testimonial.name,
			Role: testimonial.role,
			Description: testimonial.description,
			Image: testimonial.image
		};
	});
	return (
		<section className={styles.section}>
			<Button onClick={() => handleOpenModal(SettingsOperationType.CREATE, "")}>
				Add Testimonial
			</Button>
			<div className={styles.categories}>
				{isFetching ? (
					<PageLoader />
				) : (
					<Table
						headers={headers}
						data={tableData}
						iconHeaders={["Name"]}
						isLoading={isFetching}
						onEdit={handleOpenModal}
						onDelete={handleOpenModal}
					/>
				)}
			</div>
			{openModal && (
				<TestimonialModal
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

export default Testimonials;
