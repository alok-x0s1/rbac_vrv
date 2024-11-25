import { Link, useNavigate } from "react-router-dom";
import { useSidebar } from "../../hooks/useSidebar";
import {
	List,
	PieChart,
	Settings,
	PanelRight,
	LogOut,
	SquareX,
} from "lucide-react";
import { useEffect, useState } from "react";

interface SidebarProps {
	activeView: string;
	setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
	const { isSidebarOpen, setIsSidebarOpen, toggleSidebar } = useSidebar();
	const [isMobile, setIsMobile] = useState(false);
	const navigate = useNavigate();

	const menuItems = [
		{ name: "Normal View", icon: List, view: "normal" },
		{ name: "Chart View", icon: PieChart, view: "chart" },
		{ name: "Settings", icon: Settings, view: "settings" },
	];

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 1052) {
				setIsSidebarOpen(false);
				setIsMobile(true);
			} else {
				setIsSidebarOpen(true);
				setIsMobile(false);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="relative">
			<div
				className={`fixed top-0 left-0 bottom-0 h-screen border-r border-b border-gray-700 transition-all duration-300 ${
					!isSidebarOpen ? "w-0" : "w-64"
				} ${!isSidebarOpen ? "hidden" : ""}`}
			>
				<div className="w-64">
					{/* Sidebar Header */}
					<div className="flex items-center justify-start p-3 gap-2 border-b border-gray-700">
						<Link
							to="/"
							className="text-lg font-semibold pl-7 pt-[2px]"
						>
							Access Guard
						</Link>
					</div>

					{/* Menu Items */}
					<nav className="flex flex-col">
						{menuItems.map((item) => (
							<button
								key={item.view}
								onClick={() => {
									setActiveView(item.view);
									if (isMobile) toggleSidebar();
								}}
								className={`flex items-center gap-4 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
									activeView === item.view
										? "bg-gray-900 text-white"
										: "hover:bg-gray-200"
								}`}
							>
								<item.icon className="h-5 w-5" />
								<span>{item.name}</span>
							</button>
						))}
					</nav>

					<div
						className="absolute bottom-0 right-0 w-full flex items-center justify-start p-4 gap-2 border-t border-gray-700 hover:bg-gray-200 duration-300 cursor-pointer"
						onClick={() => navigate("/")}
					>
						<LogOut className="h-6 w-6" />
						<h1 className="text-lg font-semibold">Logout</h1>
					</div>
				</div>
			</div>

			<div
				className="absolute top-4 left-2 cursor-pointer z-50"
				onClick={toggleSidebar}
			>
				{isSidebarOpen ? (
					<SquareX className="h-6 w-6" />
				) : (
					<PanelRight className="h-6 w-6" />
				)}
			</div>
		</div>
	);
}
