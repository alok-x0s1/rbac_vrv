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
	}, [getProfile]);

	return (
		<div className="min-h-screen flex justify-center items-center">
			{userData?.role === "moderator" ||
			userData?.role === "administrator" ? (
				<Button
					onClick={() => navigate("/admin")}
					className="fixed top-4 right-4"
				>
					Dashboard
				</Button>
			) : (
				""
			)}
			{userData && <ProfileCard userData={userData} />}
		</div>
	);
}
