export interface ICategory {
	name?: string;
	description?: string;
	slug?: string;
	createdAt?: Date;
	updatedAt?: Date;
	_id?: string;
	id?: string;
}

export interface ICategoryResponse {
	data: ICategory[];
	count: number;
}

export interface IEditCategory {
	data: { name: string; slug: string };
}
