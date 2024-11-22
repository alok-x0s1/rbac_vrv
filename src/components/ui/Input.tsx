import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
	id: string;
	label: string;
	name: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	showPasswordToggle?: boolean;
	onPasswordToggle?: () => void;
}

export default function InputField({
	id,
	label,
	name,
	type,
	value,
	onChange,
	error,
	showPasswordToggle = false,
	onPasswordToggle,
}: InputFieldProps) {
	return (
		<div>
			<label
				htmlFor={id}
				className="block text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			<div className="mt-1 relative">
				<input
					id={id}
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					className={`appearance-none block w-full px-3 py-2 border ${
						error ? "border-red-300" : "border-gray-300"
					} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500`}
				/>
				{showPasswordToggle && (
					<button
						type="button"
						className="absolute inset-y-0 right-0 pr-3 flex items-center"
						onClick={onPasswordToggle}
					>
						{type === "password" ? (
							<EyeOff className="h-5 w-5 text-gray-400" />
						) : (
							<Eye className="h-5 w-5 text-gray-400" />
						)}
					</button>
				)}
			</div>
			{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
		</div>
	);
}
