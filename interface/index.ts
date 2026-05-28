export interface ITodo {
	id?: string;
	title: string;
	body?: string | undefined | null;
	completed?: boolean;
	createdAt?: Date;
}
