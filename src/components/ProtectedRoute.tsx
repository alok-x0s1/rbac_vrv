import { PropsWithChildren } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = PropsWithChildren & {
	allowedRoles: User["role"][];
};

export default function ProtectedRoute({
	allowedRoles,
	children,
}: ProtectedRouteProps) {
	const { userData } = useAuth();
	const navigate = useNavigate();

	if (userData === undefined) {
		return (
			<div className="text-center min-h-screen flex justify-center items-center text-4xl font-semibold">
				Loading...
			</div>
		);
	}

	if (
		userData === null ||
		(allowedRoles && !allowedRoles.includes(userData.role))
	) {
		navigate("/register");
	}

	return <>{children}</>;
}
