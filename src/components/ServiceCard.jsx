export default function ServiceCard({ title, img }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 md:w-1/2 text-center md:text-left">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      </div>
      <img src={img} alt={title} className="md:w-1/2 w-full h-64 object-cover" />
    </div>
  );
}
