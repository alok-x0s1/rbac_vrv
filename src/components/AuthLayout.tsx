import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({ children }: AuthLayoutProps) {
	const { userData } = useAuth();
	const navigate = useNavigate();

	if (userData === undefined) {
		return (
			<div className="text-center min-h-screen flex justify-center items-center text-4xl font-semibold">
				Loading...
			</div>
		);
	}

	if (userData) {
		navigate("/profile");
	}

	return <>{children}</>;
}
