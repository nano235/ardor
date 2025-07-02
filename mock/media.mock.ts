"use client";

import { useAppAssets } from "@/hooks/useLoading";

export const useMedia = () => {
	const { useGetGeneral } = useAppAssets();
	const { data: generalData } = useGetGeneral();
	return {
		media: {
			promotionVideo: {
				src: generalData?.data.promotionVideo || "",
				alt: "promotion videos"
			},
			socialMedia: {
				src: generalData?.data.socialMedia || "",
				alt: "social media"
			},
			productDemo: {
				src: generalData?.data.productDemo || "",
				alt: "product demo"
			},
			brandAnimation: {
				src: generalData?.data.brandAnimation || "",
				alt: "brand animation"
			}
		}
	};
};
