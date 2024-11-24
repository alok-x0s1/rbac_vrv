import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import SidebarProvider from "./context/SidebarProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<SidebarProvider>
				<App />
			</SidebarProvider>
		</AuthProvider>
	</StrictMode>
);
