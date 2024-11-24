import { Button } from "../ui/Button";

interface AuthToggleProps {
	isLogin: boolean;
	onToggle: () => void;
}

export default function AuthToggle({ isLogin, onToggle }: AuthToggleProps) {
	return (
		<div className="mt-6">
			<Button onClick={onToggle} variant="outline" className=" w-full">
				{`${isLogin ? "Create new account" : "Sign in instead"}`}
			</Button>
		</div>
	);
}
