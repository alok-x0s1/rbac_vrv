import { useState } from "react";
import { User } from "../../types/user";
import { Check, Clock, Code, Copy, Edit, FileBadge, Mail, Shield } from "lucide-react";
import { formatDateAndTime } from "../../utils/date";
import axios from "../../utils/axios";
import { useToast } from "@/hooks/use-toast";

export default function ProfileCard({ userData }: { userData: User }) {
	const [showJsonView, setShowJsonView] = useState(false);
	const [copied, setCopied] = useState(false);
	const [editingName, setEditingName] = useState(false);
	const [newName, setNewName] = useState<string>(userData.name);

	const { toast } = useToast();

	const handleCopyJson = () => {
		navigator.clipboard.writeText(JSON.stringify(userData, null, 2));
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleNameChange = async () => {
		try {
			const response = await axios.patch("/users/edit", {
				name: newName,
			});
			if (response.status === 200) {
				userData.name = newName;
				setEditingName(false);

				toast({
					title: "Success",
					description: "Name updated successfully",
				});
			}
		} catch (error) {
			if (error instanceof Error) {
				toast({
					variant: "destructive",
					title: "Error",
					description: error.message,
				});
			}
		}
	};

	return (
		<div className="bg-white shadow-sm rounded-xl overflow-hidden max-w-3xl mx-auto">
			<div className="p-4 flex justify-end">
				<button
					onClick={() => setShowJsonView(!showJsonView)}
					className="flex items-center text-sm text-gray-600 hover:text-gray-900"
				>
					{showJsonView ? "Profile View" : "JSON View"}
					<Code className="ml-2 h-4 w-4" />
				</button>
			</div>

			{!showJsonView ? (
				<div className="p-6">
					<div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
						<img
							src={userData.avatar}
							alt={userData.name}
							className="w-20 h-20 md:w-16 md:h-16 rounded-full border-2 border-gray-200 object-cover"
						/>
						<div className="text-center md:text-left">
							<h2 className="text-xl font-semibold text-gray-900 flex justify-center md:justify-start items-center">
								{editingName ? (
									<input
										type="text"
										value={newName}
										onChange={(e) =>
											setNewName(e.target.value)
										}
										className="text-xl font-semibold text-gray-900 w-full bg-transparent border-b border-gray-400 focus:outline-none"
									/>
								) : (
									userData.name
								)}
								<span>
									{editingName ? (
										<Check
											className="h-5 w-5 text-gray-400 ml-6 cursor-pointer"
											onClick={() => {
												setEditingName(!editingName);
												handleNameChange();
											}}
										/>
									) : (
										<Edit
											className="h-5 w-5 text-gray-400 ml-6 cursor-pointer"
											onClick={() =>
												setEditingName(!editingName)
											}
										/>
									)}
								</span>
							</h2>
							<p className="text-gray-500 pt-1">
								{userData.role}
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<div className="flex items-center space-x-3">
							<Mail className="h-5 w-5 text-gray-400" />
							<span className="text-gray-700">
								{userData.email}
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<Shield className="h-5 w-5 text-gray-400" />
							<span className="text-gray-700 capitalize">
								{userData.status}
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<FileBadge className="h-5 w-5 text-gray-400" />
							<span className="text-gray-700 capitalize">
								{userData.role}
							</span>
						</div>
						<div className="flex items-center space-x-3">
							<Clock className="h-5 w-5 text-gray-400" />
							<div>
								<p className="text-gray-700">
									Created:{" "}
									{formatDateAndTime(userData.createdAt)}
								</p>
								<p className="text-gray-500 text-sm">
									Updated:{" "}
									{formatDateAndTime(userData.updatedAt)}
								</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="p-2">
					<div className="flex justify-between items-center mb-4">
						<h3 className="text-lg font-semibold text-gray-900">
							User Information
						</h3>
						<button
							onClick={handleCopyJson}
							className="text-gray-600 hover:text-gray-900 focus:outline-none"
							title="Copy JSON"
						>
							{copied ? (
								<Check className="h-5 w-5 text-green-500" />
							) : (
								<Copy className="h-5 w-5" />
							)}
						</button>
					</div>
					<div className="bg-white p-2 sm:p-4 rounded-md text-xs md:text-sm sm:text-base text-gray-700 border border-gray-300">
						<p className="text-gray-900">{"{"}</p>
						{Object.entries(userData).map(
							([key, value], index, array) => (
								<p key={key} className="ml-3 sm:ml-4">
									<span className="text-gray-800 font-semibold">
										{key}
									</span>
									:{" "}
									<span className="text-gray-800">{`${value}`}</span>
									{index < array.length - 1 && ","}
								</p>
							)
						)}
						<p className="text-gray-900">{"}"}</p>
					</div>
				</div>
			)}
		</div>
	);
}
