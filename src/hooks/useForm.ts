import { useState } from "react";
import {
	validateEmail,
	validateName,
	validatePassword,
} from "../utils/validation";

interface FormData {
	name: string;
	email: string;
	password: string;
}

export const useForm = (isLogin: boolean) => {
	const [formData, setFormData] = useState<FormData>({
		name: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<FormData>({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		setErrors((prev) => ({
			...prev,
			[name]: "",
		}));
	};

	const validate = () => {
		const newErrors = {
			email: validateEmail(formData.email),
			password: validatePassword(formData.password),
			name: !isLogin ? validateName(formData.name) : "",
		};
		setErrors(newErrors);
		return newErrors;
	};

	return {
		formData,
		errors,
		handleChange,
		validate,
	};
};
