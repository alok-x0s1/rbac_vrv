import axios from "../../utils/axios";
import { User } from "../../types/user";
import { formatDate } from "../../utils/date";
import { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/Button";

interface SettingsCardProps {
	user: User;
	fetchAllUsers: () => void;
}

enum Action {
	MAKE_ADMIN = "Make Admin",
	MAKE_USER = "Make User",
	MAKE_MODERATOR = "Make Moderator",
	BAN_USER = "Ban User",
	UNBAN_USER = "Unban User",
	DELETE_USER = "Delete User",
	SET_INACTIVE = "Set Inactive",
	SET_ACTIVE = "Set Active",
}

export default function SettingsCard({
	user,
	fetchAllUsers,
}: SettingsCardProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { toast } = useToast();

	const handleMenuClick = async (action: string) => {
		try {
			const userId = user._id;

			switch (action) {
				case Action.MAKE_ADMIN:
					await axios.patch(
						`/admin/change-role/${userId}?role=administrator`
					);
					break;

				case Action.MAKE_USER:
					await axios.patch(`/admin/change-role/${userId}?role=user`);
					break;

				case Action.MAKE_MODERATOR:
					await axios.patch(
						`/admin/change-role/${userId}?role=moderator`
					);
					break;

				case Action.BAN_USER:
					await axios.patch(`/admin/${userId}`);
					break;

				case Action.UNBAN_USER:
					await axios.patch(`/admin/${userId}`);
					break;

				case Action.SET_INACTIVE:
					await axios.patch(`/admin/change-status/${userId}`, {
						status: "inactive",
					});
					break;

				case Action.SET_ACTIVE:
					await axios.patch(`/admin/change-status/${userId}`, {
						status: "active",
					});
					break;

				case Action.DELETE_USER:
					await axios.delete(`/admin/${userId}`);
					break;

				default:
					throw new Error("Unknown action");
			}
		} catch (err) {
			console.error(err);
			if (err instanceof AxiosError) {
				toast({
					variant: "destructive",
					title: "Error",
					description: err.response?.data.message,
				});
			} else {
				toast({
					variant: "destructive",
					title: "Error",
					description: "Something went wrong",
				});
			}
		} finally {
			setIsMenuOpen(false);
			fetchAllUsers();
		}
	};

	return (
		<div className="bg-white rounded-lg p-4 shadow-md border-r border-b hover:border-gray-500 hover:shadow-lg transition-all duration-300 relative mb-2">
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
							<Button
								onClick={() =>
									handleMenuClick(
										user.role === "administrator"
											? Action.MAKE_USER
											: Action.MAKE_ADMIN
									)
								}
								variant="outline"
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-none font-normal"
							>
								{user.role === "administrator"
									? "Revoke Admin"
									: "Make Admin"}
							</Button>
							<Button
								onClick={() =>
									handleMenuClick(
										user.role === "moderator"
											? Action.MAKE_USER
											: Action.MAKE_MODERATOR
									)
								}
								variant="outline"
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-none font-normal"
							>
								{user.role === "moderator"
									? "Revoke Moderator"
									: "Make Moderator"}
							</Button>
							<Button
								onClick={() =>
									handleMenuClick(
										user.blocked === true
											? Action.UNBAN_USER
											: Action.BAN_USER
									)
								}
								variant="outline"
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-none font-normal"
							>
								{user.blocked === true
									? "Unban User"
									: "Ban User"}
							</Button>

							<Button
								variant="outline"
								onClick={() =>
									handleMenuClick(
										user.status === "active"
											? Action.SET_INACTIVE
											: Action.SET_ACTIVE
									)
								}
								className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-none font-normal"
							>
								{user.status === "active"
									? "Deactivate User"
									: "Activate User"}
							</Button>

							<Button
								onClick={() =>
									handleMenuClick(Action.DELETE_USER)
								}
								className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
								variant="link"
							>
								Delete User
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
