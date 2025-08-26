export default function Podcast1() {
  return (
    <div
      className="p-10 text-white min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL + "podcast1.jpg"})`,
      }}
    >
      <h1 className="text-3xl font-bold mb-6">
        The #1 Thing Industry Wants in Engineers
      </h1>
      <p className="mb-4">🎙️ Ft. Dr. Venkatesh Radhakrishnan</p>
      <p className="mb-6">
        We unpack the future of engineering talent in this high-stakes
        conversation where real-world skills meet evolving industry benchmarks,
        and students transition into true industry-ready professionals.
      </p>

      <div className="flex gap-4">
        <button className="bg-red-600 px-4 py-2 rounded"> Start Watching</button>
        <button className="bg-gray-700 px-4 py-2 rounded"> Content Library</button>
        <button className="bg-gray-900 px-4 py-2 rounded"> 2025 •</button>
      </div>
    </div>
  );
}
