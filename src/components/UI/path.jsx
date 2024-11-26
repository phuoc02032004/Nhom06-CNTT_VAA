import React from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PathName = ({ paths = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-2 text-brown-800 mb-6">
      <FaHome
        className="text-lg cursor-pointer hover:text-gray-600"
        onClick={() => navigate("/")}
      />
      {paths.map((path, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-500">/</span>
          {path.onClick ? (
            <span
              className="cursor-pointer hover:underline"
              onClick={() => path.onClick(navigate)}
            >
              {path.label}
            </span>
          ) : (
            <span
              className={`font-semibold ${
                path.active ? "text-black" : "text-gray-500"
              }`}
            >
              {path.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PathName;
