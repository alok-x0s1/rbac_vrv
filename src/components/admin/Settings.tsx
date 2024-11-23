import { Filter, RefreshCcw, Search } from "lucide-react";
import { User } from "../../types/user";
import SettingsCard from "./SettingsCard";
import { useState } from "react";

interface SettingsProps {
	users: User[];
	fetchAllUsers: () => void;
}

export default function Settings({ users, fetchAllUsers }: SettingsProps) {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="p-2 pl-10">
			<div className="flex items-start mb-6 justify-between">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">
						All Members
						<span className="text-gray-600 ml-2">
							({users.length})
						</span>
					</h1>
				</div>

				<div className="flex gap-4">
					<div className="relative w-96">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search users by name or email..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
						/>
					</div>
					<button
						onClick={fetchAllUsers}
						className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-50"
					>
						<RefreshCcw className="h-4 w-4 mr-2" />
						Refresh
					</button>
					<button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border hover:bg-gray-50">
						<Filter className="h-4 w-4 mr-2" />
						Filters
					</button>
				</div>
			</div>

			{filteredUsers.map((user) => (
				<SettingsCard key={user._id} user={user} />
			))}
		</div>
	);
}
