"use client";

import styles from "./General.module.scss";
import { Formik, Form, Field, FieldProps } from "formik";
import { Button, InputField } from "@/shared";
import { PageLoader } from "@/shared/loaders";
import { usePatchGeneral } from "@/app/api/hooks/general";
import * as Yup from "yup";
import { IGeneral } from "@/app/api/hooks/general/type";
import { toast } from "react-hot-toast";
import { useAppAssets } from "@/hooks/useLoading";
const General = () => {
	const { useGetGeneral } = useAppAssets();
	const { data: generalData, refetch, isFetching } = useGetGeneral();
	const { mutateAsync: patchGeneral } = usePatchGeneral();
	const initialValues: IGeneral = {
		logo: generalData?.data?.logo || "",
		demo: generalData?.data?.demo || "",
		process: generalData?.data?.process || "",
		phoneNumber: generalData?.data?.phoneNumber || "",
		email: generalData?.data?.email || "",
		address: generalData?.data?.address || "",
		facebook: generalData?.data?.facebook || "",
		instagram: generalData?.data?.instagram || "",
		twitter: generalData?.data?.twitter || "",
		linkedin: generalData?.data?.linkedin || "",
		tikTok: generalData?.data?.tikTok || ""
	};

	const generalSchema = Yup.object().shape({
		logo: Yup.string(),
		demo: Yup.string(),
		process: Yup.string(),
		phoneNumber: Yup.string(),
		email: Yup.string(),
		address: Yup.string(),
		facebook: Yup.string(),
		instagram: Yup.string(),
		twitter: Yup.string(),
		linkedin: Yup.string(),
		tikTok: Yup.string()
	});

	const handleSubmit = async (values: IGeneral) => {
		try {
			const res = await patchGeneral(values);
			if (res) {
				toast.success("General updated successfully");
				refetch();
			}
		} catch (error: unknown) {
			const errorMessage =
				error && typeof error === "object" && "response" in error
					? (error.response as unknown as { data: { message: string } })?.data
							?.message || "General update failed"
					: "General update failed";
			toast.error(errorMessage);
		}
	};

	return (
		<section className={styles.section}>
			<div className={styles.categories}>
				{isFetching ? (
					<PageLoader />
				) : (
					<div className={styles.block}>
						<Formik
							initialValues={initialValues}
							validationSchema={generalSchema}
							onSubmit={handleSubmit}
						>
							{({ errors, touched, isSubmitting }) => {
								return (
									<Form>
										<Field name="logo">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Logo"
													placeholder={
														generalData?.data.logo ||
														"Enter Logo"
													}
													className={styles.input}
													error={
														(touched.logo && errors.logo) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="demo">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Demo Reel"
													placeholder={
														generalData?.data.demo ||
														"Enter Demo Reel"
													}
													className={styles.input}
													error={
														(touched.demo && errors.demo) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="process">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Process Video"
													placeholder={
														generalData?.data.process ||
														"Enter Process Video"
													}
													className={styles.input}
													error={
														(touched.process &&
															errors.process) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="phoneNumber">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Phone Number"
													placeholder={
														generalData?.data.phoneNumber ||
														"Enter phoneNumber"
													}
													className={styles.input}
													error={
														(touched.phoneNumber &&
															errors.phoneNumber) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="email">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Email"
													placeholder={
														generalData?.data.email ||
														"Enter Email"
													}
													className={styles.input}
													error={
														(touched.email && errors.email) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="address">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Address"
													placeholder={
														generalData?.data.address ||
														"Enter Address"
													}
													className={styles.input}
													error={
														(touched.address &&
															errors.address) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="facebook">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="facebook"
													placeholder={
														generalData?.data.facebook ||
														"Enter facebook link"
													}
													className={styles.input}
													error={
														(touched.facebook &&
															errors.facebook) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="instagram">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="instagram"
													placeholder={
														generalData?.data.instagram ||
														"Enter instagram link"
													}
													className={styles.input}
													error={
														(touched.instagram &&
															errors.instagram) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="twitter">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="twitter"
													placeholder={
														generalData?.data.twitter ||
														"Enter twitter link"
													}
													className={styles.input}
													error={
														(touched.twitter &&
															errors.twitter) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="linkedin">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="linkedin"
													placeholder={
														generalData?.data.linkedin ||
														"Enter linkedin link"
													}
													className={styles.input}
													error={
														(touched.linkedin &&
															errors.linkedin) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="tikTok">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="tikTok"
													placeholder={
														generalData?.data.tikTok ||
														"Enter tikTok link"
													}
													className={styles.input}
													error={
														(touched.tikTok &&
															errors.tikTok) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Button
											className={styles.button}
											type="submit"
											disabled={isSubmitting}
											// onClick={() => resetForm()}
										>
											Edit
										</Button>
									</Form>
								);
							}}
						</Formik>
					</div>
				)}
			</div>
		</section>
	);
};

export default General;
