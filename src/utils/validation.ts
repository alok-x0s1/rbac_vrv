const validateEmail = (email: string) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email) return "Email is required";
	if (!emailRegex.test(email)) return "Invalid email format";
	return "";
};

const validatePassword = (password: string) => {
	if (!password) return "Password is required";
	if (password.length < 8) return "Password must be at least 8 characters";
	if (!/\d/.test(password))
		return "Password must contain at least one number";
	if (!/[A-Z]/.test(password))
		return "Password must contain at least one uppercase letter";
	return "";
};

const validateName = (name: string) => {
	if (!name) return "Name is required";
	if (name.length < 2) return "Name must be at least 2 characters";
	return "";
};

export { validateEmail, validatePassword, validateName };
