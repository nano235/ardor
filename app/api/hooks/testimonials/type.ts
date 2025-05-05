export interface ITestimonial {
	name?: string;
	image?: string;
	description?: string;
	role?: string;
	createdAt?: Date;
	updatedAt?: Date;
	_id?: string;
	id?: string;
}

export interface ITestimonialResponse {
	data: ITestimonial[];
	count: number;
}

export interface IEditTestimonial {
	data: { name?: string; image?: string; description?: string; role?: string };
}
