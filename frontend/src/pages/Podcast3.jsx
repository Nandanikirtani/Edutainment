export default function Podcast3() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center text-white"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL + "podcast3.jpg"})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {/* Text content */}
      <div className="relative z-10 max-w-2xl p-10">
        <h1 className="text-4xl font-bold mb-6">India’s Silicon Leap</h1>
        <p className="mb-4 text-lg">🎙️ Ft. Dr. Ashwini K. Aggarwal</p>
        <p className="mb-6 text-gray-200 leading-relaxed">
          Discover how India is positioning itself as a global semiconductor hub
          through major government initiatives like the ₹76,000 crore Semicon India
          Program, rising investments, and the growing startup ecosystem. Learn
          about the critical talent pipeline for advanced chip design, fabrication,
          and packaging, and hear actionable insights on how industry-academia
          collaborations are shaping the future workforce for the deep-tech hardware
          revolution.
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
