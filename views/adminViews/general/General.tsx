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
		tikTok: generalData?.data?.tikTok || "",
		promotionVideo: generalData?.data?.promotionVideo || "",
		productDemo: generalData?.data?.productDemo || "",
		socialMedia: generalData?.data?.socialMedia || "",
		brandAnimation: generalData?.data?.brandAnimation || "",
		pinterest: generalData?.data?.pinterest || "",
		discovery: generalData?.data?.discovery || "",
		script: generalData?.data?.script || "",
		design: generalData?.data?.design || "",
		expert: generalData?.data?.expert || "",
		sound: generalData?.data?.sound || "",
		delivery: generalData?.data?.delivery || ""
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
		tikTok: Yup.string(),
		productDemo: Yup.string(),
		promotionVideo: Yup.string(),
		socialMedia: Yup.string(),
		brandAnimation: Yup.string(),
		pinterest: Yup.string(),
		discovery: Yup.string(),
		script: Yup.string(),
		design: Yup.string(),
		expert: Yup.string(),
		sound: Yup.string(),
		delivery: Yup.string()
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
										<Field name="promotionVideo">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Promotion Video video link"
													placeholder={
														generalData?.data
															.promotionVideo ||
														"Enter Promotion Video"
													}
													className={styles.input}
													error={
														(touched.promotionVideo &&
															errors.promotionVideo) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="productDemo">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Product Demo video link"
													placeholder={
														generalData?.data.productDemo ||
														"Enter Product Demo"
													}
													className={styles.input}
													error={
														(touched.productDemo &&
															errors.productDemo) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="socialMedia">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Social Media video link"
													placeholder={
														generalData?.data.socialMedia ||
														"Enter Social Media"
													}
													className={styles.input}
													error={
														(touched.socialMedia &&
															errors.socialMedia) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="brandAnimation">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Brand Animation video link"
													placeholder={
														generalData?.data
															.brandAnimation ||
														"Enter Brand Animation"
													}
													className={styles.input}
													error={
														(touched.brandAnimation &&
															errors.brandAnimation) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="discovery">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Discovery & Strategy video link"
													placeholder={
														generalData?.data.discovery ||
														"Enter Discovery & Strategy"
													}
													className={styles.input}
													error={
														(touched.discovery &&
															errors.discovery) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="script">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Script & Concept Development video link"
													placeholder={
														generalData?.data.script ||
														"Enter Script & Concept Development"
													}
													className={styles.input}
													error={
														(touched.script &&
															errors.script) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="design">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Design & Storyboarding video link"
													placeholder={
														generalData?.data.design ||
														"Enter Design & Storyboarding"
													}
													className={styles.input}
													error={
														(touched.design &&
															errors.design) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="expert">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Expert Editing & Animation video link"
													placeholder={
														generalData?.data.expert ||
														"Enter Expert Editing & Animation"
													}
													className={styles.input}
													error={
														(touched.expert &&
															errors.expert) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="sound">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Sound & Voiceover Integration video link"
													placeholder={
														generalData?.data.sound ||
														"Enter Sound & Voiceover Integration"
													}
													className={styles.input}
													error={
														(touched.sound && errors.sound) ||
														""
													}
													type="text"
												/>
											)}
										</Field>
										<Field name="delivery">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="Final Delivery & Optimization video link"
													placeholder={
														generalData?.data.delivery ||
														"Enter Final Delivery & Optimization"
													}
													className={styles.input}
													error={
														(touched.delivery &&
															errors.delivery) ||
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
										<Field name="pinterest">
											{({ field }: FieldProps) => (
												<InputField
													{...field}
													label="pinterest"
													placeholder={
														generalData?.data.pinterest ||
														"Enter pinterest link"
													}
													className={styles.input}
													error={
														(touched.pinterest &&
															errors.pinterest) ||
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
