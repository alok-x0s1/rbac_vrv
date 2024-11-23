import { createContext, PropsWithChildren, useState } from "react";

type SidebarProvider = {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarProvider | undefined>(undefined);

type SidebarProviderProps = PropsWithChildren;

export const SidebarProvider = ({ children }: SidebarProviderProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	return (
		<SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
			{children}
		</SidebarContext.Provider>
	);
};

export default SidebarContext;
