export interface ICareer {
	title: string;
	description: string;
	location?: string;
	jobType?: string;
}

export const careers: ICareer[] = [
	{
		title: "Motion Designer",
		description: "We are looking for a mid- level motion designer to join our team",
		location: "100% Remote",
		jobType: "Full-time"
	}
];
