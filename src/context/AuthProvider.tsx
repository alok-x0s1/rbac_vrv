import { createContext, PropsWithChildren, useState } from "react";
import { User } from "../types/user";
import axios from "../utils/axios";

type AuthProvider = {
	userData?: User | null;
	getProfile: () => Promise<void>;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthProvider | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {
	const [userData, setUserData] = useState<User | null>();

	async function getProfile() {
		try {
			const res = await axios.get("/profile");
			setUserData(res.data.data);
		} catch {
			setUserData(null);
		}
	}

	return (
		<AuthContext.Provider value={{ userData, getProfile }}>
			{children}
		</AuthContext.Provider>
	);
}

export { AuthContext };
