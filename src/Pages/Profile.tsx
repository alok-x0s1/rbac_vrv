import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ProfileCard from "../components/Home/ProfileCard";
import { Button } from "@/components/ui/Button";
import { useEffect } from "react";

export default function Profile() {
	const { getProfile, userData } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		getProfile();
	});

	return (
		<div className="min-h-screen flex justify-center items-center">
			{userData?.role === "moderator" ||
			userData?.role === "administrator" ? (
				<div className="flex gap-4 fixed top-4 right-4">
					<Button onClick={() => navigate("/")} variant="outline">
						Home
					</Button>
					<Button onClick={() => navigate("/admin")}>
						Dashboard
					</Button>
				</div>
			) : (
				""
			)}
			{userData && <ProfileCard userData={userData} />}
		</div>
	);
}
