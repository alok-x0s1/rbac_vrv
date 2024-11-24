import { createContext, PropsWithChildren, useEffect, useState } from "react";

type SidebarProvider = {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarProvider | undefined>(undefined);

type SidebarProviderProps = PropsWithChildren;

export default function SidebarProvider({ children }: SidebarProviderProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	useEffect(() => {
		if (typeof window !== "undefined" && window.innerWidth > 768) {
			setIsSidebarOpen(true);
		}
	}, []);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
}

export { SidebarContext };
