export interface IGeneral {
	logo?: string;
	demo?: string;
	process?: string;
	phoneNumber?: string;
	email?: string;
	address?: string;
	facebook?: string;
	instagram?: string;
	twitter?: string;
	linkedin?: string;
	tikTok?: string;
	createdAt?: Date;
	updatedAt?: Date;
	_id?: string;
	id?: string;
}

export interface IGeneralResponse {
	data: IGeneral;
	count: number;
}

export interface IEditGeneral {
	data: { logo?: string; demo?: string; process?: string };
}
