import { User } from "../../types/user";
import { formatDate } from "../../utils/date";

interface UserCardProps {
	user: User;
}

export default function UserCard({ user }: UserCardProps) {
	return (
		<div className="bg-white rounded-lg p-4 border-b border-transparent border-r duration-300 hover:border-gray-500 transition-all relative">
			<div className="flex items-center space-x-4">
				<img
					src={user.avatar}
					alt={user.name}
					className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
				/>
				<div className="flex-1">
					<h3 className="font-medium text-gray-900">{user.name}</h3>
					<p className="text-sm text-gray-500">{user.email}</p>
				</div>
				<div className="flex items-center gap-2">
					<p className="text-sm text-gray-600">
						{formatDate(user.createdAt)}
					</p>
					<span
						className={`px-3 py-2 text-sm rounded-md capitalize ${
							user.status === "active"
								? "bg-green-100 text-green-800"
								: "bg-gray-100 text-gray-800"
						}`}
					>
						{user.status}
					</span>

					{user.blocked && (
						<p className="text-sm text-red-600 bg-red-50 border border-red-500 px-3 py-2 rounded-md">
							Blocked
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
