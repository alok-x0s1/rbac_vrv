import { Link } from "react-router-dom";
import { useSidebar } from "../../hooks/useSidebar";
import {
	List,
	PieChart,
	Settings,
	PanelRight,
	Shield,
	LogOut,
} from "lucide-react";

interface SidebarProps {
	activeView: string;
	setActiveView: (view: string) => void;
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
	const { isSidebarOpen, toggleSidebar } = useSidebar();

	const menuItems = [
		{ name: "Normal View", icon: List, view: "normal" },
		{ name: "Chart View", icon: PieChart, view: "chart" },
		{ name: "Settings", icon: Settings, view: "settings" },
	];

	return (
		<div
			className={`fixed top-0 left-0 h-screen border-r border-gray-700 transition-all duration-300 ${
				isSidebarOpen ? "w-64" : "w-0"
			}`}
		>
			<div
				className="absolute top-2 -right-9 cursor-pointer rounded-sm p-1 hover:bg-gray-300 duration-200"
				onClick={toggleSidebar}
			>
				<PanelRight className="h-6 w-6" />
			</div>

			{isSidebarOpen && (
				<div className="flex items-center justify-start p-4 gap-2 border-b border-gray-700">
					<Shield className="h-6 w-6" />
					<Link to="/" className="text-lg font-semibold">
						Access Guard
					</Link>
				</div>
			)}

			{isSidebarOpen && (
				<nav className="flex flex-col">
					{menuItems.map((item) => (
						<button
							key={item.view}
							onClick={() => setActiveView(item.view)}
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
			)}

			{isSidebarOpen && (
				<div className="absolute bottom-0 right-0 w-full flex items-center justify-start p-4 gap-2 border-t border-gray-700 hover:bg-gray-200 duration-300 cursor-pointer">
					<LogOut className="h-6 w-6" />
					<h1 className="text-lg font-semibold">Logout</h1>
				</div>
			)}
		</div>
	);
}
