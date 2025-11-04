import ServiceCard from './ServiceCard';

const services = [
  {
    title: "TOPOGRAFÍA CON DRONES",
    img: "../../public/aforoDigital.jpg",
  },
  {
    title: "DIVISIÓN DE POTREROS",
    img: "https://cdn.pixabay.com/photo/2017/06/10/07/18/agriculture-2388693_1280.jpg",
  },
  {
    title: "BROMATOLOGÍA DIGITAL",
    img: "https://cdn.pixabay.com/photo/2021/09/03/08/20/drone-6595961_1280.jpg",
  },
  {
    title: "AFORO DIGITAL",
    img: "https://cdn.pixabay.com/photo/2016/12/07/15/47/drone-1883671_1280.jpg",
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
