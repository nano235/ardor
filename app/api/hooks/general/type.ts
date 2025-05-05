export interface IGeneral {
	logo?: string;
	demo?: string;
	process?: string;
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
