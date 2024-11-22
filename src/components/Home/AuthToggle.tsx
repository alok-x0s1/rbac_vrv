import Button from "../ui/Button";

interface AuthToggleProps {
	isLogin: boolean;
	onToggle: () => void;
}

export default function AuthToggle({ isLogin, onToggle }: AuthToggleProps) {
	return (
		<div className="mt-6">
			<Button
				onClick={onToggle}
				label={`${isLogin ? "Create new account" : "Sign in instead"}`}
				className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
			/>
		</div>
	);
}
