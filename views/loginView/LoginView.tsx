"use client";

import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import styles from "./LoginView.module.scss";
import Logo from "@/shared/logo/Logo";
import { setAuthToken } from "@/utils/tokenStorage";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/configureStore";
import { updateUser } from "@/store/slices/userSlice";
import { usePostUserSignIn } from "@/app/api/hooks/auth";
import InputField from "@/shared/inputField/InputField";
import Button from "@/shared/button/Button";
import { toast } from "react-hot-toast";

const loginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email format").required("Email is required"),
	password: Yup.string().required("Password is required")
});

const initialValues = {
	email: "",
	password: ""
};

const LoginView = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { mutateAsync: postSignIn } = usePostUserSignIn();

	const handleSubmit = async (values: typeof initialValues) => {
		try {
			const res = await postSignIn({
				email: values.email,
				password: values.password
			});
			if (res?.token) {
				dispatch(updateUser({ ...res, isAuthenticated: true }));
				setAuthToken(res?.token);
				router.push("/");
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { data: { message: string } })?.data
							?.message || "Login failed"
					: "Login failed";
			console.log(
				"error occurred....",
				errorMessage,
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { status: number })?.status
					: null
			);
			toast.error(errorMessage);
		}
	};
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<Logo />
				<div className={styles.divider}></div>
				<div className={styles.title}>
					<h3>Sign in to your account</h3>
					<p>Input your email and password to access your account.</p>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={loginSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<Field name="email">
								{({ field }: FieldProps) => (
									<InputField
										{...field}
										label="Email address"
										placeholder="Enter email address"
										className={styles.input}
										error={(touched.email && errors.email) || ""}
										type="email"
									/>
								)}
							</Field>
							<Field name="password">
								{({ field }: FieldProps) => (
									<InputField
										{...field}
										label="Password"
										placeholder="Enter Password"
										className={styles.input}
										error={
											(touched.password && errors.password) || ""
										}
									/>
								)}
							</Field>
							<Button
								className={styles.button}
								type="submit"
								disabled={isSubmitting}
							>
								Sign in
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</section>
	);
};

export default LoginView;
