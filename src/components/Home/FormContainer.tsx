interface FormContainerProps {
	children: React.ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
		</div>
	);
}
