import { Button } from "@/components/ui/Button";
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
				<Button>
					<Link
						to="/"
					>
						Go back
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default NotFound;
