"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/api";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store!}>
				<PersistGate persistor={persistor}>
					<AppProvider>
						<Toaster
							toastOptions={{
								style: {
									zIndex: 9999999
								}
							}}
						/>
						<AuthProvider>{children}</AuthProvider>
					</AppProvider>
				</PersistGate>
			</Provider>
		</QueryClientProvider>
	);
};

export default Providers;
