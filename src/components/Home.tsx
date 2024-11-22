import Cta from "./Home/Cta";
import Featured from "./Home/Featured";
import Footer from "./Home/Footer";
import Hero from "./Home/Hero";
import Navbar from "./Home/Navbar";

export default function Home() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />
			<Hero />
			<Featured />
			<Cta />
			<Footer />
		</div>
	);
}
