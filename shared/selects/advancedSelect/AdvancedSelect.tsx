"use client";

import React, { useState } from "react";
import styles from "./AdvancedSelect.module.scss";
import Image from "next/image";
import SmallLoader from "@/shared/loaders/smallLoader/SmallLoader";
import { shortenTitle } from "@/utils/stringShortner copy";
import { ICategory } from "@/app/api/hooks/categories/types";
// import { SelectOption } from "@/interfaces";

export interface SelectProps {
	options?: ICategory[];
	label?: string;
	onOptionChange?: (option?: ICategory) => void;
	defaultOptionIndex?: number;
	className?: string;
	iconClass?: string;
	icon?: string;
	title?: string;
	isTransparent?: boolean;
	defaultOption?: string;
	titleClassName?: string;
	optionClassName?: string;
	bodyClassName?: string;
	option?: string;
	error?: string;
	wrapperClassName?: string;
}

const AdvancedSelect: React.FunctionComponent<SelectProps> = ({
	options,
	onOptionChange,
	defaultOptionIndex = -1,
	className,
	iconClass,
	icon,
	title,
	isTransparent = false,
	defaultOption = "Select an Option",
	titleClassName,
	optionClassName,
	bodyClassName,
	label,
	error,
	wrapperClassName
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptionIndex, setSelectedOptionIndex] =
		useState<number>(defaultOptionIndex);

	const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsOpen(!isOpen);
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	};

	const onOptionClicked = (selectedIndex: number) => () => {
		setSelectedOptionIndex(selectedIndex);
		setIsOpen(false);

		if (onOptionChange) {
			onOptionChange(options![selectedIndex]);
		}
	};

	// useEffect(() => {
	// 	const handleClickOutside = () => {
	// 		setIsOpen(false);
	// 	};

	// 	document.addEventListener("click", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("click", handleClickOutside);
	// 	};
	// }, []);

	return (
		<div className={`${styles.select_wrapper} ${wrapperClassName}`}>
			{!!label && <label className={styles.input_label}>{label}</label>}
			<div
				className={`${styles.select} ${className}`}
				data-type={isTransparent}
				onClick={(e: React.MouseEvent<HTMLDivElement>) => {
					e.stopPropagation();
					e.nativeEvent.stopImmediatePropagation();
				}}
			>
				{!options ? (
					<SmallLoader />
				) : (
					<div className={styles.select_header} onClick={toggling}>
						<div className={styles.select_smallRow}>
							<div className={styles.flex}>
								{icon && (
									<div className={`${styles.icon} ${iconClass}`}>
										<Image src={icon} fill sizes="100vw" alt="" />
									</div>
								)}
								<p>
									{title ? title + ":" : ""}{" "}
									<span
										className={titleClassName}
										style={{ color: "#fff" }}
									>
										{selectedOptionIndex === -1
											? defaultOption
											: shortenTitle(
													options![selectedOptionIndex]
														.name as string,
													42
											  )}
									</span>
								</p>
							</div>
							<div
								className={`${styles.select_dropDownImage}`}
								style={{ rotate: isOpen ? "180deg" : "0deg" }}
							>
								<Image
									src="/svgs/dropdown.svg"
									fill
									sizes="100vw"
									alt=""
								/>
							</div>
						</div>
					</div>
				)}

				{isOpen && (
					<div className={`${styles.select_body} ${bodyClassName}`}>
						<ul className={styles.select_listContainer}>
							{options!.map((option: ICategory, index) =>
								index !== selectedOptionIndex ? (
									<li
										onClick={onOptionClicked(index)}
										key={index}
										className={styles.select_listItem}
									>
										<div className={styles.select_row}>
											<p className={optionClassName}>
												{option.name}
											</p>
										</div>
									</li>
								) : null
							)}
						</ul>
					</div>
				)}
			</div>
			{!!error && (
				<label className={styles.input_label} style={{ color: "#FC0000" }}>
					{error}
				</label>
			)}
		</div>
	);
};

export default AdvancedSelect;
