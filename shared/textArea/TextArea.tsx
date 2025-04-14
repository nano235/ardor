import React, { TextareaHTMLAttributes, forwardRef } from "react";
import styles from "./TextArea.module.scss";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name?: string;
	label?: string;
	className?: string;
	error?: string;
	textClassName?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
	({ name, label, className, error, textClassName, ...options }, ref) => {
		return (
			<div className={`${styles.textarea} ${className}`}>
				{!!label && (
					<label className={styles.textarea_label} htmlFor={name}>
						{label}
					</label>
				)}

				<div className={`${styles.textarea_wrapper} ${textClassName}`}>
					<textarea
						className={styles.textarea_field}
						name={name}
						autoComplete="off"
						ref={ref}
						{...options}
					/>
				</div>
				{!!error && (
					<label className={styles.textarea_label} style={{ color: "#FC0000" }}>
						{error}
					</label>
				)}
			</div>
		);
	}
);

TextArea.displayName = "TextArea";

export default TextArea;
