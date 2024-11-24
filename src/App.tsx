import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Admin, Home, NotFound, Profile, Register } from "./Pages";
import { ProtectedRoute } from "./components/Routes";
import { Toaster } from "@/components/ui/toaster";

function App() {
	return (
		<Router>
			{/* Global layout with Toaster */}
			<div>
				{/* Toast container persists across routes */}
				<Toaster />

				{/* Application routes */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/profile"
						element={
							<ProtectedRoute
								allowedRoles={[
									"user",
									"administrator",
									"moderator",
								]}
							>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin"
						element={
							<ProtectedRoute
								allowedRoles={["administrator", "moderator"]}
							>
								<Admin />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
