import { Key, Settings, Users } from "lucide-react";
import FeatureCard from "./FeaturedCard";

export default function Featured() {
	return (
		<div className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<FeatureCard
						icon={
							<Users className="h-12 w-12 text-gray-700 mb-4" />
						}
						title="User Management"
						description="Easily manage users, roles, and permissions with our intuitive interface."
					/>
					<FeatureCard
						icon={<Key className="h-12 w-12 text-gray-700 mb-4" />}
						title="Fine-grained Control"
						description="Define granular permissions and policies for precise access control."
					/>
					<FeatureCard
						icon={
							<Settings className="h-12 w-12 text-gray-700 mb-4" />
						}
						title="Easy Integration"
						description="Seamlessly integrate with your existing infrastructure and workflows."
					/>
				</div>
			</div>
		</div>
	);
}
