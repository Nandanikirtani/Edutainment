// import React from "react";
// import { useParams } from "react-router-dom";

// const iconData = {
//   1: {
//     title: "Anoushka Lomas",
//     img: "icon1.png",
//     description: "Wing Commander in IAF",
//     video: "https://www.youtube.com/embed/abc1",
//   },
//   2: {
//     title: "Lalit Sharma",
//     img: "icon2.png",
//     description: "Country Head, Polaris India",
//     video: "https://www.youtube.com/embed/abc2",
//   },
//   3: {
//     title: "Dr. Mahima Bakshi",
//     img: "icon3.png",
//     description: "Well-known health expert",
//     video: "https://www.youtube.com/embed/abc3",
//   },
//   4: {
//     title: "Tanmay Grover",
//     img: "icon4.png",
//     description: "Innovator and Entrepreneur",
//     video: "https://www.youtube.com/embed/abc4",
//   },
// };

// export default function IconDetail() {
//   const { id } = useParams();
//   const icon = iconData[id];

//   if (!icon) return <div className="text-white">Icon not found</div>;

//   return (
//     <div className="bg-black text-white min-h-screen p-10">
//       <h2 className="text-3xl font-bold mb-6">{icon.title}</h2>
//       <img
//         src={icon.img}
//         alt={icon.title}
//         className="w-full max-w-3xl mx-auto mb-6 rounded-lg"
//       />
//       <p className="mb-6">{icon.description}</p>
//       <iframe
//         width="100%"
//         height="400"
//         src={icon.video}
//         title={icon.title}
//         allowFullScreen
//       />
//     </div>
//   );
// }







import React from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2 } from "lucide-react";

const iconData = {
  1: {
    title: "Anoushka Lomas",
    bg: "icon-bg1.png",   // ✅ background images for icons
    img: "icon1.png",
    description: "Inspiring journey of Anoushka Lomas at MRU.",
    video: "https://www.youtube.com/embed/3o6Tze3o43k", // replace with real link
  },
  2: {
    title: "Lalit Sharma",
    bg: "icon-bg2.png",
    img: "icon2.png",
    description: "The story of leadership and success of Lalit Sharma.",
    video: "https://www.youtube.com/embed/rL5tVESPJs8",
  },
  3: {
    title: "Dr. Mahima Bakshi",
    bg: "icon-bg3.png",
    img: "icon3.png",
    description: "Recognized for contributions in wellness and health.",
    video: "https://www.youtube.com/embed/1XnvvvJew3I",
  },
  4: {
    title: "Parents of Tanmay Grover",
    bg: "icon-bg4.png",
    img: "icon4.png",
    description: "Celebrating the proud parents of Tanmay Grover.",
    video: "https://www.youtube.com/embed/DtfhT5KiCLA",
  },
};

export default function IconDetail() {
  const { id } = useParams();
  const icon = iconData[id];

  if (!icon) return <div className="text-white">Icon not found</div>;

  return (
    <div className="text-white min-h-screen">
      {/* Hero Section with Background */}
      <section
        className="relative w-full min-h-[80vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${icon.bg})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content on top */}
        <div className="relative z-10 p-10 max-w-4xl">
          <h1 className="text-4xl font-bold mb-6">{icon.title}</h1>

          <div className="flex gap-4 mb-6">
            <button className="bg-red-700 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-red-800">
              ▶ Start Watching
            </button>
            <button className="bg-red-700 px-6 py-2 rounded-lg font-semibold hover:bg-red-800">
              + Content Library
            </button>
          </div>

          <p className="text-gray-200 mb-4">{icon.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span>2025 •</span>
            <button className="p-2 border rounded-lg"><Heart size={20} /></button>
            <button className="p-2 border rounded-lg"><Share2 size={20} /></button>
          </div>

          {/* YouTube Video */}
          <iframe
            width="100%"
            height="350"
            src={icon.video}
            title={icon.title}
            allowFullScreen
            className="rounded-lg shadow-md max-w-3xl"
          />
        </div>
      </section>

      {/* More Icons Section */}
      <section className="bg-black py-12 px-10">
        <h2 className="text-2xl font-semibold mb-4">More from Icons of MRU</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(iconData).map(([key, data]) => (
            <Link
              key={key}
              to={`/icon/${key}`}
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
