import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export default function Hero() {
	const navigate = useNavigate();
	const { userData } = useAuth();

	return (
		<div className="bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
				<div className="text-center">
					<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
						Secure Access Control Made Simple
					</h1>
					<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
						Streamline your application's authorization with our
						powerful role-based access control system.
					</p>
					<div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
						{!userData ? (
							<>
								<Button onClick={() => navigate("/register")}>
									Join Now
									<ChevronRight className="ml-2 h-5 w-5" />
								</Button>

								<Button
									onClick={() => navigate("/explore")}
								>
									Explore
								</Button>
							</>
						) : (
							<>
								<Button onClick={() => navigate("/profile")}>
									Get Started
									<ChevronRight className="ml-2 h-5 w-5" />
								</Button>

								<Button onClick={() => navigate("/admin")}>
									Dashboard
								</Button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
