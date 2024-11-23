import ProfileCard from "./Home/ProfileCard";
import { useAuth } from "../hooks/useAuth";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const { userData } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex justify-center items-center">
			{userData?.role === "moderator" ||
			userData?.role === "administrator" ? (
				<Button
					label="Dashboard"
					className="px-6 py-3 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center duration-300 absolute top-5 right-5"
					onClick={() => navigate("/admin")}
				/>
			) : (
				""
			)}
			{userData && <ProfileCard {...userData} />}
		</div>
	);
}
