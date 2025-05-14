export interface NavLinkMenu {
	label: string;
	id?: string;
	href: string;
	external: boolean;
	icon?: string;
}

export interface GlobalContext {
	progress: number;
	setProgress: React.Dispatch<React.SetStateAction<number>>;
	isPageLoaded: boolean;
	setIsPageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavLinkSub {
	label: string;
	icon: string;
	href: string;
	id?: string;
	menu?: NavLinkMenu[];
}

export interface NavLink {
	label: string;
	id?: string;
	href: string;
	external: boolean;
	videoUrl?: string;
	subMenu?: NavLinkSub[];
	title?: string;
	description?: string;
	button?: string;
	icon?: string;
}
export enum SettingsOperationType {
	RESTORE = "Restore",
	BAN = "Ban",
	ADD = "Add",
	EDIT = "Edit",
	DELETE = "Delete",
	DECLINE = "Decline",
	APPROVE = "Approve",
	CREATE = "Create"
}
