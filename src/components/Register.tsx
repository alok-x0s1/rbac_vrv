import { useState } from "react";
import { Shield, ArrowRight } from "lucide-react";
import { AxiosError } from "axios";
import Button from "./ui/Button";
import { useForm } from "../hooks/useForm";
import FormContainer from "./Home/FormContainer";
import InputField from "./ui/Input";
import AuthToggle from "./Home/AuthToggle";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

export default function Register() {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [apiError, setApiError] = useState<string>("");

	const navigate = useNavigate();

	const { formData, errors, handleChange, validate } = useForm(isLogin);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = validate();
		if (Object.values(newErrors).some((err) => err)) return;

		try {
			let res;

			setLoading(true);
			if (isLogin) {
				res = await axios.post("/users/login", formData);
			} else {
				res = await axios.post("/users/register", formData);
			}

			if (res.status === 200) {
				setApiError("");
				navigate("/profile");
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response) {
					setApiError(
						error.response.data.message || "Something went wrong."
					);
				} else {
					setApiError("An unexpected error occurred.");
				}
			}
		} finally {
			formData.name = "";
			formData.email = "";
			formData.password = "";
			setLoading(false);
		}
	};

	return (
		<FormContainer>
			{apiError && (
				<div
					className="absolute bottom-6 right-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
					role="alert"
				>
					<span className="block sm:inline">{apiError}</span>
				</div>
			)}
			<div className="flex justify-center">
				<Shield className="h-12 w-12 text-gray-900" />
			</div>
			<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
				{isLogin ? "Sign in to your account" : "Create your account"}
			</h2>
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{!isLogin && (
							<InputField
								id="name"
								label="Full Name"
								name="name"
								type="text"
								value={formData.name}
								onChange={handleChange}
								error={errors.name}
							/>
						)}
						<InputField
							id="email"
							label="Email address"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							error={errors.email}
						/>
						<InputField
							id="password"
							label="Password"
							name="password"
							type={showPassword ? "text" : "password"}
							value={formData.password}
							onChange={handleChange}
							error={errors.password}
							showPasswordToggle={true}
							onPasswordToggle={() =>
								setShowPassword(!showPassword)
							}
						/>
						<Button
							type="submit"
							label={isLogin ? "Sign in" : "Sign up"}
							className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none"
							loading={loading}
						>
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</form>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">
									{isLogin
										? "Don't have an account?"
										: "Already have an account?"}
								</span>
							</div>
						</div>
					</div>

					<AuthToggle
						isLogin={isLogin}
						onToggle={() => setIsLogin(!isLogin)}
					/>
				</div>
			</div>
		</FormContainer>
	);
}
