import { Loader2 } from "lucide-react";

interface ButtonProps {
	label: string;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
	className?: string;
	loading?: boolean;
	children?: React.ReactNode;
}

export default function Button({
	label,
	onClick,
	disabled = false,
	type = "button",
	className = "",
	loading = false,
	children,
}: ButtonProps) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
			className={`px-4 py-2 rounded-md flex items-center justify-center ${className} ${
				disabled || loading ? "bg-gray-300 cursor-not-allowed" : ""
			}`}
		>
			{loading && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
			{loading ? "Loading..." : label}
			{!loading && children}
		</button>
	);
}
