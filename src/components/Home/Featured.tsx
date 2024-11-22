import { Key, Settings, Users } from "lucide-react";

export default function Featured() {
	return (
		<div className="py-24 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<div className="bg-white p-8 rounded-xl shadow-sm">
						<Users className="h-12 w-12 text-gray-700 mb-4" />
						<h3 className="text-xl font-semibold mb-4">
							User Management
						</h3>
						<p className="text-gray-600">
							Easily manage users, roles, and permissions with our
							intuitive interface.
						</p>
					</div>
					<div className="bg-white p-8 rounded-xl shadow-sm">
						<Key className="h-12 w-12 text-gray-700 mb-4" />
						<h3 className="text-xl font-semibold mb-4">
							Fine-grained Control
						</h3>
						<p className="text-gray-600">
							Define granular permissions and policies for precise
							access control.
						</p>
					</div>
					<div className="bg-white p-8 rounded-xl shadow-sm">
						<Settings className="h-12 w-12 text-gray-700 mb-4" />
						<h3 className="text-xl font-semibold mb-4">
							Easy Integration
						</h3>
						<p className="text-gray-600">
							Seamlessly integrate with your existing
							infrastructure and workflows.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
