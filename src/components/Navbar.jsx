export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">TecnyCampo</h1>
        <ul className="flex gap-6 text-sm font-semibold">
          <li><a href="#" className="hover:text-yellow-300">HOME</a></li>
          <li><a href="#" className="hover:text-yellow-300">ACERCA DE NOSOTROS</a></li>
          <li><a href="#" className="hover:text-yellow-300">UNIDADES DE NEGOCIO</a></li>
          <li><a href="#" className="hover:text-yellow-300">CONTÁCTANOS</a></li>
        </ul>
      </div>
    </nav>
  );
}
