import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link } from "react-router-dom";
import { getServices } from "../../apiServices/apiServices";
import toast from "react-hot-toast";
import { IoIosArrowDropright } from "react-icons/io";

function UserManageCategories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const fetchCategoriesList = async () => {
    try {
      const res = await getServices(`/api/category/manage/list`);
      if (res.responseCode === 200) {
        setData(res.responseData);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-black">
      <UserNavbar>
        <div className="container mx-auto px-4 mb-10 mt-3">
          <p className="text-4xl text-white font-semibold">Categories</p>
          {data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 my-4">
              {data.map((category, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Link
                    to={"/user/categories/manage_sub_categories"}
                    state={{ category_id: category._id }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xl font-semibold">{category.name}</span>
                    <IoIosArrowDropright
                      className="text-blue-600 text-2xl cursor-pointer"
                      title="Go to sub-categories"
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold text-gray-100">
              <p>No Categories found...</p>
            </div>
          )}
        </div>
      </UserNavbar>
    </div>
  );
}

export default UserManageCategories;
