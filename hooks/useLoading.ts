// example inside a component or custom hook
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "@/context/AppContext";
import { API_URL } from "@/app/api/url";
import { api } from "@/app/api";
import { IGeneralResponse } from "@/app/api/hooks/general/type";

export const useAppAssets = () => {
	const { setProgress, setIsPageLoaded } = useGlobalContext();

	const useGetGeneral = () => {
		return useQuery<IGeneralResponse, Error>({
			queryKey: ["general"],
			queryFn: async () => {
				setProgress(0);
				setIsPageLoaded(false);
				let progressValue = 0;
				const progressInterval = setInterval(() => {
					if (progressValue < 90) {
						progressValue += 5;
						setProgress(progressValue);
					}
				}, 100);
				try {
					const response = await api.get(API_URL.general);
					clearInterval(progressInterval);
					setProgress(100);
					setIsPageLoaded(true);
					return response.data;
				} catch (error) {
					clearInterval(progressInterval);
					setProgress(0);
					throw error;
				} finally {
					setTimeout(() => {
						setProgress(0);
					}, 3000);
				}
			}
		});
	};
	return { useGetGeneral };
};
