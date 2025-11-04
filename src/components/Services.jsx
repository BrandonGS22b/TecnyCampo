import ServiceCard from './ServiceCard';

const services = [
  {
    title: "TOPOGRAFÍA CON DRONES",
    img: "../../public/aforoDigital.jpg",
  },
  {
    title: "DIVISIÓN DE POTREROS",
    img: "../../public/POTREROS.jpg",
  },
  {
    title: "BROMATOLOGÍA DIGITAL",
    img: "../../public/BROMATOLOGÍA.jpg",
  },
  {
    title: "AFORO DIGITAL",
    img: "../../public/aforoDigital.jpg",
  },
];

export default function Services() {
  return (
    <section className="py-12 px-6 md:px-20 bg-gray-100">
      <div className="max-w-6xl mx-auto space-y-8">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
}
