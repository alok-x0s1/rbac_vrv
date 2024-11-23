import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register.tsx";
import Profile from "./components/Profile.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthLayout from "./components/AuthLayout.tsx";
import Admin from "./components/Admin.tsx";
import { SidebarProvider } from "./context/SidebarProvider.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/register",
		element: (
			<AuthLayout>
				<Register />
			</AuthLayout>
		),
	},
	{
		path: "/profile",
		element: (
			<ProtectedRoute
				allowedRoles={["user", "administrator", "moderator"]}
			>
				<Profile />
			</ProtectedRoute>
		),
	},
	{
		path: "/admin",
		element: (
			<ProtectedRoute allowedRoles={["administrator", "moderator"]}>
				<Admin />
			</ProtectedRoute>
		),
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<SidebarProvider>
				<RouterProvider router={router} />
			</SidebarProvider>
		</AuthProvider>
	</StrictMode>
);
