const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center px-4 bg-white">
      <h1 className="text-5xl font-bold mb-4">
        Welcome to <span className="text-blue-600">Edu</span>
        <span className="text-orange-500">Navigator</span>
      </h1>
      <p className="max-w-xl text-gray-600 text-lg mb-6">
        Your personalized journey to learning starts here. Join thousands of learners and access world-class education from anywhere.
      </p>
      <div className="space-x-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Get Started
        </button>
        <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50">
          Explore Courses
        </button>
      </div>
    </section>
  );
};

export default Home;
