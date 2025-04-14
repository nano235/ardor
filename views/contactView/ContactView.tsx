"use client";

import React from "react";
import styles from "./ContactView.module.scss";
import { Button, CustomLink, InputField, TextArea, Title } from "@/shared";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";

interface ContactFormValues {
	name: string;
	email: string;
	message: string;
}

const ContactView = () => {
	const initialValues: ContactFormValues = {
		name: "",
		email: "",
		message: ""
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Name is required"),
		email: Yup.string().email("Invalid email").required("Email is required"),
		message: Yup.string().required("Message is required")
	});

	return (
		<div className={styles.contact}>
			<div className={styles.container}>
				<div className={styles.row}>
					<Title title="Let’s Work Together!" />
					<div className={styles.text}>
						<h6>
							Ready to create something impactful? Whether it’s a product
							demo, promo video, logo animation, or YouTube editing, we’re
							here to craft stunning visuals that captivate your audience.
							Let’s collaborate! 🚀
						</h6>
						<CustomLink
							href="mailto:hello@ardors.studio"
							label="info@ardors.studio"
						/>
					</div>
				</div>
				<div className={styles.form}>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={() => {}}
						enableReinitialize
					>
						{({ errors, touched, isSubmitting }) => {
							return (
								<Form>
									<Field name="name">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Full name"
												error={
													(touched.name && errors.name) || ""
												}
												readOnly
												placeholder="Enter Your Full Name"
											/>
										)}
									</Field>
									<Field name="email">
										{({ field }: FieldProps) => (
											<InputField
												{...field}
												label="Email address"
												error={
													(touched.email && errors.email) || ""
												}
												readOnly
												placeholder="Enter Your Email Address"
											/>
										)}
									</Field>
									<Field name="name">
										{({ field }: FieldProps) => (
											<TextArea
												{...field}
												label="Message"
												error={
													(touched.message && errors.message) ||
													""
												}
												readOnly
												placeholder="What Do You Need?"
											/>
										)}
									</Field>
									<Button
										type="submit"
										disabled={isSubmitting}
										className={styles.button}
									>
										Submit
									</Button>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default ContactView;
