import { ChevronRight } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
	const navigate = useNavigate();
	return (
		<div className="bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
				<div className="text-center">
					<h1 className="text-5xl font-bold text-gray-900 mb-6">
						Secure Access Control Made Simple
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
						Streamline your application's authorization with our
						powerful role-based access control system.
					</p>
					<div className="flex justify-center space-x-4">
						<Button
							label="Start Now"
							className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center duration-300"
							onClick={() => navigate("/register")}
						>
							<ChevronRight className="ml-2 h-5 w-5" />
						</Button>
						<Button
							label="View Demo"
							className="px-8 py-3 border border-gray-300 rounded-lg hover:border-gray-400 text-gray-700 duration-300"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
