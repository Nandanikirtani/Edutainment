export default function Podcast2() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center text-white"
      style={{
        backgroundImage: `url(${import.meta.env.BASE_URL + "podcast2.jpg"})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

      {/* Text content */}
      <div className="relative z-10 max-w-2xl p-10">
        <h1 className="text-4xl font-bold mb-6">Traditional vs Dynamic Pedagogy</h1>
        <p className="mb-4 text-lg">🎙️ Ft. Dr. Anadajit Goswami</p>
        <p className="mb-6 text-gray-200 leading-relaxed">
          In a riveting conversation with Dr. Anadajit Goswami — Professor and
          Director at the School of Behavioural and Social Sciences, Research
          Director at Manav Rachna International Institute of Research and Studies,
          and a leading voice across institutions like IMPRI, Ashoka University,
          and J-PAL — we unravel the transformative state of education in the age of
          interdisciplinarity.
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
