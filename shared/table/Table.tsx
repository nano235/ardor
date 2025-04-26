import React from "react";
import styles from "./Table.module.scss";
import Button from "../button/Button";
import { PageLoader } from "../loaders";
import { SettingsOperationType } from "@/interfaces";
interface TableProps {
	headers: string[];
	data: any[];
	iconHeaders: string[];
	isLoading: boolean;
	onEdit: (title: SettingsOperationType, id: string, slug?: string) => void;
	onDelete: (title: SettingsOperationType, id: string, slug?: string) => void;
}

const Table: React.FC<TableProps> = ({
	headers,
	data,
	iconHeaders,
	isLoading,
	onEdit,
	onDelete
}) => {
	return (
		<div className={styles.container}>
			{isLoading ? (
				<PageLoader />
			) : (
				<table className={styles.table}>
					<thead>
						<tr>
							{headers.map((header, index) => (
								<th key={index}>{header}</th>
							))}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data?.length ? (
							data?.map((row, rowIndex) => (
								<tr key={rowIndex}>
									{headers.map((header, colIndex) => (
										<td key={colIndex}>
											{iconHeaders.includes(header) ? (
												<div className={styles.nameCell}>
													{row[header].split("_").join(" ")}
												</div>
											) : (
												<span data-type={row[header]}>
													{row[header]}
												</span>
											)}
										</td>
									))}
									<td>
										<div className={styles.row}>
											<Button
												buttonType="secondary"
												className={styles.button}
												onClick={() =>
													onEdit(
														SettingsOperationType.EDIT,
														row.id,
														row.slug
													)
												}
											>
												Edit
											</Button>
											<Button
												buttonType="secondary"
												className={styles.button}
												onClick={() =>
													onDelete(
														SettingsOperationType.DELETE,
														row.id,
														row.slug
													)
												}
											>
												Delete
											</Button>
										</div>
									</td>
								</tr>
							))
						) : (
							<div className={styles.noData}>
								<p>No data found</p>
							</div>
						)}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Table;
