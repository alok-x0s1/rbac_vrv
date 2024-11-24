import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
			<h1 className="text-6xl font-bold text-gray-900">404</h1>
			<p className="mt-4 text-2xl text-gray-700">
				Oops! The page you're looking for doesn't exist.
			</p>
			<p className="mt-2 text-lg text-gray-500">
				It might have been moved or deleted.
			</p>
			<div className="mt-6">
				<Link
					to="/"
					className="inline-block px-6 py-2 bg-gray-900 text-white text-lg font-semibold rounded-md hover:bg-gray-800 focus:outline-none"
				>
					Go back
				</Link>
			</div>
		</div>
	);
};

export default NotFound;
