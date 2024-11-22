import { Shield } from "lucide-react";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="border-b bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center">
						<Link to="/" className="flex items-center">
							<Shield className="h-8 w-8" />
							<span className="ml-2 text-xl font-semibold">
								AccessGuard
							</span>
						</Link>
					</div>
					<div className="flex items-center space-x-4">
						<Button
							label="Documentation"
							className="bg-transparent text-gray-600 hover:text-gray-800 duration-300"
						/>
						<Button
							label="Get Started"
							className="bg-gray-900 text-white hover:bg-gray-800 duration-300"
						/>
					</div>
				</div>
			</div>
		</nav>
	);
}
