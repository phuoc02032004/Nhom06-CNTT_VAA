import React, { useEffect, useState } from "react";
import { getAllCategory } from "../../services/category";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getAllCategory();
        setCategory(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Không thể tải danh mục. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/product/${categoryId}`);
  };

  return (
    <div className="absolute left-0 mt-2 bg-white shadow-lg w-[800px] border border-gray-200 z-50">
      {loading ? (
        <p className="text-center text-gray-500 py-4">Đang tải danh mục...</p>
      ) : error ? (
        <p className="text-center text-red-500 py-4">{error}</p>
      ) : (
        <div className="grid grid-cols-4 gap-8 p-6 text-left">
          {category.length > 0 ? (
            category.map((item) => (
              <div key={item._id} className="border-r border-gray-300 pr-4">
                <h4
                  className="font-bold text-[#6b4226] text-sm cursor-pointer hover:underline"
                  onClick={() => handleCategoryClick(item._id)}
                >
                  {item.name.toUpperCase()}
                </h4>
                <p className="mt-2 text-[#6b4226] text-sm">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">Không có danh mục nào.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
