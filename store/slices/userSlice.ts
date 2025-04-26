import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
	name?: string;
	email?: string;
	token?: string;
	id?: string;
	isAuthenticated?: boolean;
	role?: string;
}

const initialState: User = {
	name: "",
	email: "",
	token: "",
	id: "",
	isAuthenticated: false,
	role: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<Partial<User> | null>) => {
			if (!action.payload) {
				return initialState;
			}
			Object.assign(state, action.payload);
		},
		clearUser: state => initialState,
	},
});

export default userSlice.reducer;
export const { updateUser, clearUser } = userSlice.actions;
