import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type AuthLayoutProps = PropsWithChildren;

export default function AuthRoute({ children }: AuthLayoutProps) {
	const { userData, getProfile } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		getProfile();
	});

	useEffect(() => {
		if (userData !== undefined && userData !== null) {
			navigate("/profile");
		}
	});

	if (userData === undefined) {
		return (
			<div className="text-center min-h-screen flex justify-center items-center text-4xl font-semibold">
				Loading...
			</div>
		);
	}

	return <>{children}</>;
}
