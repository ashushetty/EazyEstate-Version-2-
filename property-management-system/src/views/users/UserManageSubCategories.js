import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { getServices } from "../../apiServices/apiServices";
import toast from "react-hot-toast";

function UserManageSubCategories() {
  const [data, setData] = useState({ subCategories: [] });
  const location = useLocation().state;

  useEffect(() => {
    fetchSubCategoriesList();
  }, []);

  const fetchSubCategoriesList = async () => {
    try {
      const res = await getServices(
        `/api/subcategory/manage/list?category_id=${location.category_id}`
      );
      if (res.responseCode === 200) {
        setData(res.responseData[0] || { subCategories: [] });
      } else {
        setData({ subCategories: [] });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-black">
      <UserNavbar>
        <div className="container mx-auto px-4 mb-10 mt-3">
          <p className="text-4xl font-semibold text-white">Sub-Categories</p>
          {data.subCategories && data.subCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 my-4">
              {data.subCategories.map((sub_category, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Link
                    to={"/user/categories/sub_categories/list_properties"}
                    state={{
                      category_id: location.category_id,
                      subcategory_id: sub_category._id,
                    }}
                    className="flex justify-between items-center"
                  >
                    <span className="text-xl font-semibold">{sub_category.name}</span>
                    <IoIosArrowDropright
                      className="text-blue-600 text-2xl cursor-pointer"
                      title="Go to properties"
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold text-gray-100">
              <p>No Sub-Categories found...</p>
            </div>
          )}
        </div>
      </UserNavbar>
    </div>
  );
}

export default UserManageSubCategories;
