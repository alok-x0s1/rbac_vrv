import { useState } from "react";
import { Shield, ArrowRight, Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { useForm } from "../hooks/useForm";
import FormContainer from "../components/Home/FormContainer";
import InputField from "../components/ui/Input";
import AuthToggle from "../components/Home/AuthToggle";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/Button";

export default function Register() {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const { formData, errors, handleChange, validate } = useForm(isLogin);
	const { toast } = useToast();

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

			toast({
				title: "Success",
				description: res.data.message,
			});
			navigate("/profile");
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response) {
					toast({
						variant: "destructive",
						title: "Error",
						description: error.response.data.message,
					});
				} else {
					toast({
						variant: "destructive",
						title: "Error",
						description: "Something went wrong",
					});
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
			<Link to="/" className="flex justify-center">
				<Shield className="h-12 w-12 text-gray-900" />
			</Link>
			<h2 className="mt-6 text-center text-2xl sm:text-3xl font-bold text-gray-900">
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
							className="w-full flex justify-center items-center"
						>
							{loading ? (
								<div className="animate-spin">
									<Loader2 />
								</div>
							) : (
								<>
									{isLogin ? "Sign in" : "Sign up"}
									<ArrowRight className="ml-2" />
								</>
							)}
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
