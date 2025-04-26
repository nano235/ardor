export interface IUser {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
	token: string;
	matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IUserResponse {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
	token: string;
}

export interface IUserRequest {
	email: string;
	password: string;
}

export interface IAddTokensRes {
	message: string;
}
