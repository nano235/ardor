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
	pinterest?: string;
	promotionVideo?: string;
	socialMedia?: string;
	productDemo?: string;
	brandAnimation?: string;
	discovery?: string;
	script?: string;
	design?: string;
	expert?: string;
	sound?: string;
	delivery?: string;
	discoveryMob?: string;
	scriptMob?: string;
	designMob?: string;
	expertMob?: string;
	soundMob?: string;
	deliveryMob?: string;
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
