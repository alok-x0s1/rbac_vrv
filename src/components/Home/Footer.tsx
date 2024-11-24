import { Shield } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-gray-50 border-t">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
				<div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
					<div className="flex items-center">
						<Shield className="h-6 w-6 text-gray-700" />
						<span className="ml-2 text-gray-900">AccessGuard</span>
					</div>
					<div className="text-gray-600 text-center sm:text-right">
						© 2024 AccessGuard. All rights reserved.
					</div>
				</div>
			</div>
		</footer>
	);
}
