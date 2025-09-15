
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";

const awardData = {
  1: {
    title: "Life Time Achievement",
    bg: "hero1-bg.png",   // ✅ must start with /
    img: "award1.png",
    description: "Awarded for exemplary contribution to society.",
    video: "https://www.youtube.com/embed/qjG6PU4IrYs",
  },
  2: {
    title: "Nation Building",
    bg: "hero2-bg.png",
    img: "award2.png",
    description: "Shri Ravindra Chandra Bhargava: Contribution to the Nation.",
    video: "https://www.youtube.com/embed/WBl0I7WaACA",
  },
  3: {
    title: "Young Leader",
    bg: "hero3-bg.png",
    img: "award3.png",
    description: "Ms. Shradha Suri Marwah: Recognizing youth leadership & motivation.",
    video: "https://www.youtube.com/embed/pGmBsWEFrtU",
  },
  4: {
    title: "Corporate & Industry",
    bg: "hero4-bg.png",
    img: "award4.png",
    description: "Shri Dinesh Kumar Sarraf: Industry and corporate leadership.",
    video: "https://www.youtube.com/embed/AjQ-qntkWRY",
  },
};

export default function AwardDetail() {
  const { id } = useParams();
  const award = awardData[id];

  if (!award) return <div className="text-white">Award not found</div>;

  return (
    <div className="text-white min-h-screen">
      {/* Hero Section with Background */}
      <section
        className="relative w-full min-h-[80vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${award.bg})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content on top */}
        <div className="relative z-10 p-10 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{award.title} Award</h1>

          <div className="flex gap-4 mb-6">
            <button className="bg-red-700 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-red-800">
              ▶ Start Watching
            </button>
            <button className="bg-red-700 px-6 py-2 rounded-lg font-semibold hover:bg-red-800">
              + Content Library
            </button>
          </div>

          <p className="text-gray-200 mb-4">{award.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span>2025 •</span>
            <button className="p-2 border rounded-lg"><Heart size={20} /></button>
            <button className="p-2 border rounded-lg"><Share2 size={20} /></button>
          </div>

          {/* YouTube Video */}
          <iframe
            width="100%"
            height="350"
            src={award.video}
            title={award.title}
            allowFullScreen
            className="rounded-lg shadow-md max-w-3xl"
          />
        </div>
      </section>

      {/* More Awards Section */}
      <section className="bg-black py-12 px-10">
        <h2 className="text-2xl font-semibold mb-4">More from MRE Awards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(awardData).map(([key, data]) => (
            <Link
              key={key}
              to={`/award/${key}`}
              className="bg-gray-900 p-3 rounded-lg hover:scale-105 transition-transform shadow-md"
            >
              <img
                src={data.img}
                alt={data.title}
                className="rounded-md mb-3 w-full h-40 object-cover"
              />
              <p className="text-sm font-medium">{data.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}




