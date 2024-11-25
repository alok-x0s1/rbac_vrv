import {
	BarChart,
	LineChart,
	PieChart,
	Bar,
	Line,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { User } from "../../types/user";

interface RoleDistributionChartProps {
	users: User[];
}

const ChartsView: React.FC<RoleDistributionChartProps> = ({ users }) => {

	const roleCounts = users.reduce(
		(counts: { [key: string]: number }, user) => {
			counts[user.role] = (counts[user.role] || 0) + 1;
			return counts;
		},
		{ administrator: 0, moderator: 0, user: 0 }
	);

	const data = [
		{ name: "Administrators", value: roleCounts.administrator },
		{ name: "Moderators", value: roleCounts.moderator },
		{ name: "Regular Users", value: roleCounts.user },
	];

	const pieColors = ["#FF5733", "#33FF57", "#3357FF"];
	const barColors = ["#FFC300", "#FF5733", "#900C3F"];
	const lineColors = ["#1E90FF", "#32CD32", "#FFD700"];

	return (
		<div className="bg-gray-50 p-3 rounded-lg shadow-md pl-9">
			<h2 className="text-2xl font-bold mb-6">User Role Distribution</h2>

			<div className="mb-6">
				<h3 className="text-xl font-semibold mb-2">Pie Chart</h3>
				<ResponsiveContainer width="100%" height={300}>
					<PieChart>
						<Pie
							data={data}
							dataKey="value"
							nameKey="name"
							outerRadius={100}
							label
						>
							{data.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={pieColors[index]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>

			<div className="mb-6">
				<h3 className="text-xl font-semibold mb-2">Bar Chart</h3>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="value" fill={barColors[0]} />
					</BarChart>
				</ResponsiveContainer>
			</div>

			<div>
				<h3 className="text-xl font-semibold mb-2">Line Chart</h3>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="value"
							stroke={lineColors[0]}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default ChartsView;
