import axios from "../../utils/axios";
import { User } from "../../types/user";
import { formatDate } from "../../utils/date";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { AxiosError } from "axios";

interface SettingsCardProps {
	user: User;
}

enum Action {
	MAKE_ADMIN = "Make Admin",
	MAKE_USER = "Make User",
	MAKE_MODERATOR = "Make Moderator",
	BAN_USER = "Ban User",
	UNBAN_USER = "Unban User",
	DELETE_USER = "Delete User",
}

export default function SettingsCard({ user }: SettingsCardProps) {
	const [error, setError] = useState<string | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleMenuClick = async (action: string) => {
		try {
			setError(null);
			let response;
			const userId = user._id;

			switch (action) {
				case Action.MAKE_ADMIN:
					response = await axios.patch(
						`/admin/change-role/${userId}?role=administrator`
					);
					break;

				case Action.MAKE_USER:
					response = await axios.patch(
						`/admin/change-role/${userId}?role=user`
					);
					break;

				case Action.MAKE_MODERATOR:
					response = await axios.patch(
						`/admin/change-role/${userId}?role=moderator`
					);
					break;

				case Action.BAN_USER:
					response = await axios.patch(`/admin/${userId}`);
					break;

				case Action.UNBAN_USER:
					response = await axios.patch(`/admin/${userId}`);
					break;

				case Action.DELETE_USER:
					response = await axios.delete(`/admin/${userId}`);
					break;

				default:
					throw new Error("Unknown action");
			}

			console.log(`${action} successful`, response.data);
			setError(null);
		} catch (err) {
			console.error(err);
			if (err instanceof AxiosError) {
				setError(
					err.response?.data?.message ||
						`Failed to ${action.toLowerCase()} for ${user.name}`
				);
			} else {
				setError("An unexpected error occurred.");
			}
		} finally {
			setIsMenuOpen(false);
		}
	};

	return (
		<div className="bg-white rounded-lg p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative mb-2">
			{error && (
				<div
					className="absolute top-2 right-2 bg-red-50 border border-red-400 text-red-600 px-4 py-2 rounded-md shadow-md z-50"
					role="alert"
				>
					<span>{error}</span>
				</div>
			)}

			<div className="flex flex-wrap items-center gap-4">
				<img
					src={user.avatar}
					alt={user.name}
					className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
				/>

				<div className="flex-1 min-w-[150px]">
					<h3 className="font-semibold text-gray-900">{user.name}</h3>
					<p className="text-sm text-gray-500">{user.email}</p>
				</div>

				<div className="flex items-center gap-2">
					<span
						className={`text-xs font-medium px-3 py-1 rounded-full border ${
							user.role === "administrator"
								? "bg-red-50 text-red-600 border-red-400"
								: user.role === "moderator"
								? "bg-yellow-50 text-yellow-600 border-yellow-400"
								: "bg-green-50 text-green-600 border-green-400"
						}`}
					>
						{user.role}
					</span>
				</div>

				<div>
					<span
						className={`text-xs font-medium px-3 py-1 rounded-full border ${
							user.status === "active"
								? "bg-green-50 text-green-600 border-green-400"
								: "bg-red-50 text-red-600 border-red-400"
						}`}
					>
						{user.status}
					</span>
				</div>

				{user.blocked && (
					<div>
						<span
							className={`text-xs font-medium px-3 py-1 rounded-full border text-red-500 border-red-500`}
						>
							Blocked
						</span>
					</div>
				)}

				<div className="flex-1 min-w-[150px]">
					<p className="text-sm text-blue-500 truncate">
						{user.permissions.length > 0
							? user.permissions.join(", ")
							: "No permissions"}
					</p>
				</div>

				<div className="text-sm text-gray-600">
					{formatDate(user.createdAt)}
				</div>

				<div className="relative">
					<EllipsisVertical
						className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					/>
					{isMenuOpen && (
						<div className="absolute right-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-md w-40 z-50">
							<button
								onClick={() =>
									handleMenuClick(
										user.role === "administrator"
											? Action.MAKE_USER
											: Action.MAKE_ADMIN
									)
								}
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								{user.role === "administrator"
									? "Revoke Admin"
									: "Make Admin"}
							</button>
							<button
								onClick={() =>
									handleMenuClick(
										user.role === "moderator"
											? Action.MAKE_USER
											: Action.MAKE_MODERATOR
									)
								}
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								{user.role === "moderator"
									? "Revoke Moderator"
									: "Make Moderator"}
							</button>
							<button
								onClick={() =>
									handleMenuClick(
										user.blocked === true
											? Action.UNBAN_USER
											: Action.BAN_USER
									)
								}
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							>
								{user.blocked === true
									? "Unban User"
									: "Ban User"}
							</button>
							<button
								onClick={() =>
									handleMenuClick(Action.DELETE_USER)
								}
								className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
							>
								Delete User
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
