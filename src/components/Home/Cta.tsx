import { Button } from "../ui/Button";

export default function Cta() {
	return (
		<div className="bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
				<div className="bg-gray-900 rounded-2xl p-8 sm:p-12 text-center">
					<h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
						Ready to secure your application?
					</h2>
					<p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
						Get started with our RBAC solution today and take
						control of your application's security.
					</p>
					<Button variant="outline">
						Get Started
					</Button>
				</div>
			</div>
		</div>
	);
}
