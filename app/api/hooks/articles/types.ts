import { ICategory } from "../categories/types";

export interface Video {
	url: string;
	thumbnail: string;
}

export interface IArticle {
	title?: string;
	description?: string;
	content?: string;
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
}

export interface IArticleResponse {
	data: IArticle[] | IArticle;
	count: number;
}
