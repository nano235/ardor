import { ICategory } from "../categories/types";

export interface Video {
	url: string;
	thumbnail: string;
}

export interface IArticle {
	title?: string;
	description?: string;
	client?: string;
	agency?: string;
	productionTime?: string;
	videoType?: string;
	challenges?: string[];
	solutions?: string[];
	images?: string[];
	videos?: Video[];
	categories?: ICategory[];
	featured?: boolean;
	slug?: string;
	createdAt?: Date;
	updatedAt?: Date;
	_id?: string;
	id?: string;
	credit?: string;
	website?: string;
	attendance?: string;
	projectType?: string;
	metrics?: string;
}

export interface IArticleResponse {
	data: IArticle[] | IArticle;
	count: number;
}
