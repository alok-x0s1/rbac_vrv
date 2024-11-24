import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type PermittedProps = PropsWithChildren & {
	allowedPermissions: string[];
};

export default function PermittedRoute({
	allowedPermissions,
	children,
}: PermittedProps) {
	const { userData } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (userData === undefined) {
			return;
		}

		if (
			userData === null ||
			(allowedPermissions &&
				!userData.permissions.some((permission) =>
					allowedPermissions.includes(permission)
				))
		) {
			navigate("/");
		}
	}, [userData, allowedPermissions, navigate]);

	if (userData === undefined) {
		return (
			<div className="text-center min-h-screen flex justify-center items-center text-4xl font-semibold">
				Loading...
			</div>
		);
	}

	return <>{children}</>;
}
