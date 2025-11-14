import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import FarmTypeFilter from "./components/FarmTypeFilter";


export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <FarmTypeFilter />
      <Services />
      <Footer />
    </div>
  );
}
