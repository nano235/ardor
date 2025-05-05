"use client";

import React, { useState } from "react";
import styles from "./Careers.module.scss";
import { Table } from "@/shared";
import { Button } from "@/shared";
import { PageLoader } from "@/shared/loaders";
import { SettingsOperationType } from "@/interfaces";
import { ICareer } from "@/app/api/hooks/careers/types";
import { useGetCareers } from "@/app/api/hooks/careers";
import CareersModal from "@/shared/modals/careersModal/CareersModal";
const Careers = () => {
	const { data: careersData, refetch, isFetching } = useGetCareers();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<SettingsOperationType>(
		SettingsOperationType.EDIT
	);
	const [modalId, setModalId] = useState<string>("");
	const headers = ["Title", "Description", "Location", "Job Type"];

	const handleOpenModal = (title: SettingsOperationType, id: string) => {
		setOpenModal(true);
		setModalTitle(title);
		setModalId(id);
	};

	const careers = careersData?.data as ICareer[];

	const tableData: ICareer[] = careers?.map((career: ICareer) => {
		return {
			id: career._id,
			Title: career.title,
			Description: career.description,
			Location: career.location,
			JobType: career.jobType
		};
	});
	return (
		<section className={styles.section}>
			<Button onClick={() => handleOpenModal(SettingsOperationType.CREATE, "")}>
				Add Career
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
				<CareersModal
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

export default Careers;
