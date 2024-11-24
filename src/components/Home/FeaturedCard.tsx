import { ReactNode } from "react";

interface FeatureCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
	<div className="bg-white p-8 rounded-xl shadow-sm">
		{icon}
		<h3 className="text-xl font-semibold mb-4">{title}</h3>
		<p className="text-gray-600">{description}</p>
	</div>
);

export default FeatureCard;
