import { useState } from "react";
import { User } from "../../types/user";
import { Check, Clock, Code, Copy, Mail, Shield } from "lucide-react";

export default function ProfileCard(userData: User) {
	const [showJsonView, setShowJsonView] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopyJson = () => {
		navigator.clipboard.writeText(JSON.stringify(userData, null, 2));
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="bg-white shadow-sm rounded-xl overflow-hidden max-w-xl mx-auto">
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
					<div className="flex items-center space-x-4 mb-6">
						<img
							src={userData.avatar}
							alt={userData.name}
							className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
						/>
						<div>
							<h2 className="text-xl font-semibold text-gray-900">
								{userData.name}
							</h2>
							<p className="text-gray-500">{userData.role}</p>
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
							<Clock className="h-5 w-5 text-gray-400" />
							<div>
								<p className="text-gray-700">
									Created: {formatDate(userData.createdAt)}
								</p>
								<p className="text-gray-500 text-sm">
									Updated: {formatDate(userData.updatedAt)}
								</p>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="p-6 rounded-lg shadow-sm">
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
					<div className="bg-white p-4 rounded-lg text-base text-gray-700 border border-gray-300">
						<p className="text-gray-900">{"{"}</p>
						{Object.entries(userData).map(
							([key, value], index, array) => (
								<p key={key} className="ml-4">
									<span className="text-gray-800 font-semibold">
										{key}
									</span>
									:{" "}
									<span className="text-gray-800">
										{`${value}`}
									</span>
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
