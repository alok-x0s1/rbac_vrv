import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/Register.tsx";
import Profile from "./components/Profile.tsx";
import AuthProvider from "./components/context/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/register",
		element: <Register />,
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
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</StrictMode>
);
