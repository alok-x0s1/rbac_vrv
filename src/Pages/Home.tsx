import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Featured from "../components/Home/Featured";
import Cta from "../components/Home/Cta";
import Footer from "../components/Home/Footer";

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
