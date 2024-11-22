import { User } from "../types/user";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import ProfileCard from "./Home/ProfileCard";

export default function Profile() {
	const [userData, setUserData] = useState<User>();
	useEffect(() => {
		const fetchProfile = async () => {
			const res = await axios.get("/profile");
			setUserData(res.data.data);
		};

		fetchProfile();
	}, []);

	return (
		<div className="min-h-screen flex justify-center items-center">
			{userData && <ProfileCard {...userData} />}
		</div>
	);
}
