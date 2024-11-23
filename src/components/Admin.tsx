import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { User } from "../types/user";
import { Settings, Shield, User2Icon, Users } from "lucide-react";
import Sidebar from "./admin/Sidebar";
import SettingsComponent from "./admin/Settings";
import { useSidebar } from "../hooks/useSidebar";
import RoleSection from "./admin/RoleSection";
import RoleDistributionChart from "./admin/Chart";
import { useNavigate } from "react-router-dom";

export default function Admin() {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeView, setActiveView] = useState("normal");

	const { isSidebarOpen } = useSidebar();
	const navigate = useNavigate();

	const fetchAllUsers = async () => {
		try {
			setIsLoading(true);
			const res = await axios.get("/admin/users");
			setUsers(res.data.users);
		} catch (error) {
			console.error("Failed to fetch users:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const administrators = users.filter(
		(user) => user.role === "administrator"
	);
	const moderators = users.filter((user) => user.role === "moderator");
	const regularUsers = users.filter((user) => user.role === "user");

	return (
		<div className="min-h-screen flex bg-gray-50">
			<Sidebar activeView={activeView} setActiveView={setActiveView} />
			<div
				className={`flex-1 transition-all duration-300 ${
					isSidebarOpen ? "ml-64" : "ml-0"
				}`}
			>
				{activeView === "normal" && (
					<div className="w-full p-2 pl-10">
						<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
							<div>
								<h1 className="text-2xl font-bold text-gray-900">
									User Management
								</h1>
								<p className="text-gray-500">
									Manage your team and their account
									permissions here
								</p>
							</div>
							<div className="mt-4 md:mt-0 flex space-x-3">
								<button
									className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-50"
									onClick={() => navigate("/profile")}
								>
									<User2Icon className="h-4 w-4 mr-2" />
									Profile
								</button>
							</div>
						</div>

						{isLoading ? (
							<div className="text-center py-12">
								<div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-gray-800 rounded-full mx-auto mb-4" />
								<p className="text-gray-500">
									Loading users...
								</p>
							</div>
						) : (
							<div className="space-y-6">
								<RoleSection
									title="Administrators"
									icon={Shield}
									users={administrators}
									color="bg-purple-100 text-purple-700"
								/>

								<RoleSection
									title="Moderators"
									icon={Settings}
									users={moderators}
									color="bg-blue-100 text-blue-700"
								/>

								<RoleSection
									title="Regular Users"
									icon={Users}
									users={regularUsers}
									color="bg-green-100 text-green-700"
								/>
							</div>
						)}

						<div className="mt-6 bg-white rounded-lg shadow-sm p-4">
							<div className="grid grid-cols-3 gap-4 text-center">
								<div>
									<p className="text-sm text-gray-500">
										Total Users
									</p>
									<p className="text-2xl font-semibold text-gray-900">
										{users.length}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Active Users
									</p>
									<p className="text-2xl font-semibold text-gray-900">
										{
											users.filter(
												(u) => u.status === "active"
											).length
										}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Blocked Users
									</p>
									<p className="text-2xl font-semibold text-gray-900">
										{users.filter((u) => u.blocked).length}
									</p>
								</div>
							</div>
						</div>
					</div>
				)}

				{activeView === "chart" &&
					(isLoading ? (
						<div className="text-center py-12">
							<div className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-gray-800 rounded-full mx-auto mb-4" />
							<p className="text-gray-500">Loading users...</p>
						</div>
					) : (
						<div>
							<RoleDistributionChart users={users} />
						</div>
					))}

				{activeView === "settings" && (
					<SettingsComponent
						users={users}
						fetchAllUsers={fetchAllUsers}
					/>
				)}
			</div>
		</div>
	);
}
