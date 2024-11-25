import { ArrowLeft, ArrowRight, RefreshCcw, Search } from "lucide-react";
import { User } from "../../types/user";
import SettingsCard from "./SettingsCard";
import { useState } from "react";
import { Button } from "../ui/Button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

interface SettingsProps {
	users: User[];
	fetchAllUsers: () => void;
}

export default function Settings({ users, fetchAllUsers }: SettingsProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedRole, setSelectedRole] = useState("all");
	const [selectedStatus, setSelectedStatus] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 10;

	const filteredUsers = users.filter((user) => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesRole =
			selectedRole === "all" || user.role.toLowerCase() === selectedRole;
		const matchesStatus =
			selectedStatus === "all" ||
			(selectedStatus === "active" && user.status === "active") ||
			(selectedStatus === "inactive" && user.status === "inactive") ||
			(selectedStatus === "blocked" && user.blocked === true);

		return matchesSearch && matchesRole && matchesStatus;
	});

	const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedUsers = filteredUsers.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage);
	};

	return (
		<div className="p-3 pb-6 pl-6">
			<div className="flex items-start mb-6 justify-between flex-col md:flex-row gap-2">
				<div>
					<h1 className="text-2xl pl-4 font-bold text-gray-900">
						All Members
						<span className="text-gray-600 ml-2">
							({filteredUsers.length})
						</span>
					</h1>
				</div>

				<div className="flex gap-4 mt-4 sm:mt-0">
					<div className="relative w-full sm:w-96">
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
				</div>
			</div>

			<div className="flex flex-wrap gap-4 mb-4">
				<Select
					onValueChange={(selectedRole) =>
						setSelectedRole(selectedRole)
					}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select by type" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							<SelectItem value="all">All users</SelectItem>
							<SelectItem value="user">Users</SelectItem>
							<SelectItem value="moderator">
								Moderators
							</SelectItem>
							<SelectItem value="administrator">Administrator</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Select
					onValueChange={(selectedStatus) =>
						setSelectedStatus(selectedStatus)
					}
				>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Select by status" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Status</SelectLabel>
							<SelectItem value="all">All users</SelectItem>
							<SelectItem value="active">Active</SelectItem>
							<SelectItem value="inactive">Inactive</SelectItem>
							<SelectItem value="blocked">Blocked</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			{paginatedUsers.map((user) => (
				<SettingsCard
					key={user._id}
					user={user}
					fetchAllUsers={fetchAllUsers}
				/>
			))}

			<div className="flex flex-wrap gap-2 justify-between items-center mt-6">
				<Button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`${
						currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
					}`}
					variant="outline"
				>
					<ArrowLeft className="mr-1" /> Previous
				</Button>

				<span className="text-gray-700 mt-4 sm:mt-0">
					Page {currentPage} of {totalPages}
				</span>

				<Button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`${
						currentPage === totalPages
							? "opacity-50 cursor-not-allowed"
							: "hover:bg-gray-50"
					}`}
					variant="outline"
				>
					Next <ArrowRight className="ml-1" />
				</Button>
			</div>
		</div>
	);
}
