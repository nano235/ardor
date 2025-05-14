"use client";

import { GlobalContext } from "@/interfaces";
import React, { useState, useContext, createContext } from "react";

const AppContext = createContext<GlobalContext | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [progress, setProgress] = useState<number>(0);
	const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
	return (
		<AppContext.Provider
			value={{
				progress,
				setProgress,
				isPageLoaded,
				setIsPageLoaded
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	if (!AppContext)
		throw new Error("This hook should be called within an AppContext provider");
	return useContext(AppContext) as GlobalContext;
};

export { AppContext, AppProvider };
