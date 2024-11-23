import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { User } from "../types/user";
import axios from "../utils/axios";

type AuthProvider = {
	userData?: User | null;
	getProfile: () => Promise<void>;
	handleLogout: () => Promise<void>;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthProvider | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
	const [userData, setUserData] = useState<User | null>();

	async function getProfile() {
		try {
			const res = await axios.get("/profile");
			setUserData(res.data.data);
		} catch (error) {
			if (axios.isAxiosError(error))
				console.log(error.response?.data.message);
			setUserData(null);
		}
	}

	useEffect(() => {
		getProfile();
	}, []);

	async function handleLogout() {
		try {
			await axios.post("/users/logout");
			setUserData(null);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<AuthContext.Provider value={{ userData, getProfile, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext };
