export type User = {
	avatar: string;
	createdAt: string;
	email: string;
	name: string;
	role: "user" | "administrator" | "moderator";
	status: "active" | "inactive";
	updatedAt: string;
	_id: string;
};
