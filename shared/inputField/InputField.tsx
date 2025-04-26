"use client";

import React, { InputHTMLAttributes } from "react";
import styles from "./InputField.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name?: string;
	// isPassword?: boolean;
	className?: string;
	error?: string;
	label?: string;
}

const InputField = ({ name, className, error, label, ...options }: Props) => {
	return (
		<div className={`${styles.input} ${className}`}>
			{!!label && (
				<label className={styles.input_label} htmlFor={name}>
					{label}
				</label>
			)}
			<div className={styles.input_wrapper}>
				<input
					className={styles.input_field}
					name={name}
					autoComplete="off"
					{...options}
				/>
			</div>
			{!!error && (
				<label className={styles.input_label} style={{ color: "#FC0000" }}>
					{error}
				</label>
			)}
		</div>
	);
};

export default InputField;
