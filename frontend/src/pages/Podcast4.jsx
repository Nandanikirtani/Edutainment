export default function Podcast4() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center text-white"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL + "podcast4.jpg"})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {/* Text content */}
      <div className="relative z-10 max-w-2xl p-10">
        <h1 className="text-4xl font-bold mb-6">Will AI make Engineering Obsolete?</h1>
        <p className="mb-4 text-lg">🎙️ Ft. Dr. Dipali Bansal</p>
        <p className="mb-6 text-gray-200 leading-relaxed">
          Our guest for this episode, Dr. Dipali Bansal, Professor and Dean, School
          of Engineering at Manav Rachna University, brings decades of academic and
          industry experience to the mic. With her deep expertise in AI, signal
          processing, and emerging tech trends, Dr. Bansal breaks down the myths,
          realities, and future pathways of engineering in the age of AI.
        </p>

        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold">
            ▶ Start Watching
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg font-semibold">
            + Content Library
          </button>
          <span className="bg-gray-900 px-5 py-2 rounded-lg">2025 •</span>
        </div>
      </div>
    </div>
  );
}
