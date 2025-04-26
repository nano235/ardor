"use client";

import React, { useState } from "react";
import styles from "./Articles.module.scss";
import { useGetArticles } from "@/app/api/hooks/articles";
import { PageLoader } from "@/shared/loaders";
import { SettingsOperationType } from "@/interfaces";
import { Button, Table } from "@/shared";

import ArticleModal from "@/shared/modals/articleModal/ArticleModal";
import { IArticle } from "@/app/api/hooks/articles/types";

const CategoriesView = () => {
	const { data: articleData, refetch, isFetching } = useGetArticles();
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [modalTitle, setModalTitle] = useState<SettingsOperationType>(
		SettingsOperationType.EDIT
	);
	const [modalId, setModalId] = useState<string>("");
	const [modalSlug, setModalSlug] = useState<string>("");
	const headers = ["Name", "Slug"];

	const handleOpenModal = (title: SettingsOperationType, id: string, slug?: string) => {
		setOpenModal(true);
		setModalTitle(title);
		setModalId(id);
		setModalSlug(slug || "");
	};

	const articles = articleData?.data as IArticle[];

	const tableData: any = articles?.map((article: IArticle) => {
		return {
			id: article._id,
			Slug: article.slug,
			Name: article.title
		};
	});

	return (
		<section className={styles.section}>
			<Button onClick={() => handleOpenModal(SettingsOperationType.CREATE, "")}>
				Add Article
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
				<ArticleModal
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

export default CategoriesView;
