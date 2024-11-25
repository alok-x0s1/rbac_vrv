import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren & {
	allowedRoles: User["role"][];
};

export default function ProtectedRoute({
	allowedRoles,
	children,
}: ProtectedRouteProps) {
	const { userData, getProfile } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		getProfile();
	});

	useEffect(() => {
		if (userData !== undefined && userData !== null) {
			if (!allowedRoles.includes(userData.role)) {
				navigate("/register");
			}
		} else if (userData === null) {
			navigate("/register");
		}
	}, [userData, allowedRoles, navigate]);

	if (userData === undefined) {
		return (
			<div className="text-center min-h-screen flex justify-center items-center text-4xl font-semibold">
				Loading...
			</div>
		);
	}

	return <>{children}</>;
}
