"use client";

import React, { useState } from "react";
import styles from "./WaitListInput.module.scss";
import Button from "../button/Button";
import InputField from "../inputField/InputField";

const WaitListInput = () => {
	const [email, setEmail] = useState<string>("");
	const [state, setState] = useState("idle");
	const [message, setMessage] = useState<string | null>(null);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setState("Loading");

		try {
			//   const response = await axios.post('/api/subscribe', { email })
			setState("Success");
			setEmail("");
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (
							error.response as unknown as {
								data: { error: { message: string } };
							}
					  )?.data?.error?.message || "An error occurred"
					: "An unknown error occurred";
			setMessage(errorMessage);
			setState("Error");
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h3>Join our newsletter</h3>
			</div>
			<form onSubmit={handleSubmit}>
				<div className={styles.inputContainer}>
					<InputField
						required
						type="email"
						name="email"
						id="email"
						className={styles.input}
						placeholder="Enter your email address"
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
					/>
					<Button
						className={styles.inputButton}
						type="submit"
						disabled={state === "Loading"}
					>
						<p>Subscribe</p>
					</Button>
				</div>
				{state === "Error" && (
					<div
						className={`${styles.newsLetter_message} ${styles.newsLetter_error}`}
					>
						<p>{message}</p>
					</div>
				)}
				{state === "Success" && (
					<div
						className={`${styles.newsLetter_message} ${styles.newsLetter_success}`}
					>
						<p>Thanks for Subscribing! We have sent you an email.</p>
					</div>
				)}
			</form>
		</div>
	);
};

export default WaitListInput;
