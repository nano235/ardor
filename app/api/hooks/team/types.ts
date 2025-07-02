export interface ITeam {
	name?: string;
	role?: string;
	slug?: string;
	avatar?: string;
	id?: string;
	_id?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ITeamResponse {
	data: ITeam[];
}

export interface IEditTeam {
	data: { name: string; slug: string; role: string; avatar: string };
}
