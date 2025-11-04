export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[400px] flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/12/07/15/47/drone-1883671_1280.jpg)' }}
    >
      <div className="absolute inset-0 bg-green-900/60"></div>
      <div className="relative text-center z-10">
        <h2 className="text-3xl font-bold">SERVICIO DE</h2>
        <h1 className="text-5xl font-extrabold text-yellow-300 mt-2">DRONES</h1>
      </div>
    </section>
  );
}
