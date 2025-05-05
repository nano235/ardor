export interface ICareer {
	title?: string;
	description?: string;
	location?: string;
	jobType?: string;
	createdAt?: Date;
	updatedAt?: Date;
	_id?: string;
	id?: string;
}

export interface ICareerResponse {
	data: ICareer[];
	count: number;
}

export interface IEditCareer {
	data: { title?: string; description?: string; location?: string; jobType?: string };
}
