import { LucideIcon } from "lucide-react";
import { User } from "../../types/user";
import UserCard from "./UserCard";
import { useAuth } from "../../hooks/useAuth";

interface RoleSectionProps {
	title: string;
	icon: LucideIcon;
	users: User[];
	color: string;
}

export default function RoleSection({
	title,
	icon: Icon,
	users,
	color,
}: RoleSectionProps) {
	const { userData } = useAuth();
	return (
		<div
			className={`bg-white rounded-b-xl shadow-sm border ${
				title === "Regular Users" && "border-green-200"
			} ${title === "Moderators" && "border-blue-200"} ${
				title === "Administrators" && "border-purple-200"
			}`}
		>
			<div
				className={`p-4 flex flex-wrap items-center justify-between ${color}`}
			>
				<div className="flex items-center space-x-3">
					<Icon className="h-5 w-5 shrink-0" />
					<h2 className="font-semibold text-lg">{title}</h2>
					<span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
						{users.length}
					</span>
				</div>
			</div>
			<div className="p-4 space-y-3">
				{users.map((user) => (
					<UserCard key={user._id} user={user} />
				))}
				{users.length === 0 && (
					<div className="text-center py-8 text-red-500 text-sm sm:text-base">
						{userData?.role === "moderator"
							? "You are not authorized to view this section."
							: "No users found."}
					</div>
				)}
			</div>
		</div>
	);
}
