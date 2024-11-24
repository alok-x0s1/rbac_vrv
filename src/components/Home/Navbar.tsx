import { useState } from "react";
import { Shield, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export default function Navbar() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
					<div className="hidden md:flex items-center space-x-4">
						<Link to="/documentation">
							<Button variant="secondary">Documentation</Button>
						</Link>
						<Link to="/register">
							<Button>Get Started</Button>
						</Link>
					</div>
					<div className="md:hidden">
						<button
							onClick={() =>
								setIsMobileMenuOpen(!isMobileMenuOpen)
							}
							aria-label="Toggle Menu"
							className="text-gray-800 hover:text-gray-600 focus:outline-none"
						>
							{isMobileMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</button>
					</div>
				</div>
			</div>
			{isMobileMenuOpen && (
				<div className="md:hidden border-t bg-white">
					<div className="flex flex-wrap py-4 px-4 gap-2 items-center">
						<Link to="/documentation">
							<Button
								variant="secondary"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Documentation
							</Button>
						</Link>
						<Link to="/register">
							<Button onClick={() => setIsMobileMenuOpen(false)}>
								Get Started
							</Button>
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}
