"use client";

import { useGetTeams } from "@/app/api/hooks/team";
import { ITeam } from "@/app/api/hooks/team/types";
import { SettingsOperationType } from "@/interfaces";
import { Button, Table, TeamsModal } from "@/shared";
import { PageLoader } from "@/shared/loaders";
import React, { useState } from "react";
import styles from "./TeamView.module.scss";

const TeamView = () => {
	const { data: teamsData, refetch, isFetching } = useGetTeams();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<SettingsOperationType>(
		SettingsOperationType.EDIT
	);
	const [modalId, setModalId] = useState<string>("");
	const [modalSlug, setModalSlug] = useState<string>("");
	const headers = ["name", "role"];

	const teams = teamsData?.data as ITeam[];

	const handleOpenModal = (title: SettingsOperationType, id: string, slug?: string) => {
		setOpenModal(true);
		setModalTitle(title);
		setModalId(id);
		setModalSlug(slug as string);
	};

	const tableData: ITeam[] = teams?.map((article: ITeam) => {
		return {
			id: article._id,
			role: article.role,
			name: article.name,
			Slug: article.slug
		};
	});

	return (
		<section className={styles.section}>
			<Button onClick={() => handleOpenModal(SettingsOperationType.CREATE, "")}>
				Add Team member
			</Button>
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
				<TeamsModal
					openModal={openModal}
					setOpenModal={setOpenModal}
					title={modalTitle}
					isLoading={false}
					slug={modalSlug}
					id={modalId}
					refetch={refetch}
				/>
			)}
		</section>
	);
};

export default TeamView;
