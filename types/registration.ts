export interface RegistrationWithUser {
	id: string;
	approved: boolean;
	approvedBy?: string;
	paid: boolean;
	paidBy?: string;
	createdAt: string;
	user?: {
		id: string;
		name?: string;
		email?: string;
		image?: string;
		studentId?: string;
		profile?: {
			telephone?: string;
			mobile?: string;
		};
	};
	edition?: {
		institute?: {
			name?: string;
			acronym?: string;
			logo?: string;
		};
		startDate?: string;
		endDate?: string;
		price?: number;
		priceViaZoom?: number;
	};
}

export interface EditionTab {
	id: string;
	title: string;
	startDate: string;
	endDate: string;
	institute?: {
		name?: string;
		acronym?: string;
	};
}

export interface AnnouncementRow {
	id: string;
	content: string;
	featured: boolean;
	approved: boolean;
	createdAt: string;
	user?: {
		name?: string;
		image?: string | null;
	};
}
