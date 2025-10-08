import React from "react";
import { useNavigate } from "react-router-dom";

const DepartmentExplorer = ({ name }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg shadow-lg p-4 w-64 text-center">
      <h3 className="text-lg font-bold mb-2">{name}</h3>
      <button
        onClick={() => navigate(`/courses`)}
        className="mt-2 px-4 py-2 border border-red-500 transition mx-auto block"
      >
        View Courses
      </button>
    </div>
  );
};

export default DepartmentExplorer;
