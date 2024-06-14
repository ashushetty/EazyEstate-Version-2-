import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { Input } from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";

function UserListProperties() {
  const [data, setData] = useState([]);
  const location = useLocation().state;

  useEffect(() => {
    fetchPropertiesList();
  }, []);

  const fetchPropertiesList = async () => {
    try {
      const res = await getServices(
        `/api/properties/list/bycat?prop_status=&cattegory_id=${location.category_id}&subcat_id=${location.subcategory_id}`
      );
      if (res.responseCode === 200) {
        // Ensure each property object has an 'images' array to display a preview image
        const propertiesWithImages = res.responseData.map((property) => ({
          ...property,
          previewImage: property.images && property.images.length > 0 ? property.images[0] : null
        }));
        setData(propertiesWithImages);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handlePropertySearch = async (e) => {
    try {
      const res = await getServices(
        `/api/properties/seach/filter?property_name=${e.target.value}&city=&locality=`
      );
      if (res.responseCode === 200) {
        const propertiesWithImages = res.responseData.map((property) => ({
          ...property,
          previewImage: property.images && property.images.length > 0 ? property.images[0] : null
        }));
        setData(propertiesWithImages);
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
          <div className="flex justify-between items-center">
            <p className="text-4xl  text-white font-semibold">Property list by Category</p>
            <div className="w-fit max-w-56">
              <Input
                label="Enter the Property name"
                onChange={handlePropertySearch}
                icon={<IoSearch className="absolute left-3 top-2.5 h-5 w-5 text-white" />}
                className="pl-10 text-white bg-gray-700 border-0 rounded-lg placeholder-gray-400"
                inputClass="text-white bg-gray-700 border-0 placeholder-gray-400"
              />
            </div>
          </div>
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4">
              {data.map((property, i) => (
                <div
                  key={i}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-xl">
                      {property.property_name}
                    </p>
                    <p
                      className={`px-2 py-1 rounded text-sm ${
                        property.prop_status === 1
                          ? "bg-green-100 text-green-600"
                          : property.prop_status === 2
                          ? "bg-yellow-100 text-yellow-600"
                          : property.prop_status === 3
                          ? "bg-red-100 text-red-600"
                          : property.prop_status === 4
                          ? "bg-blue-100 text-blue-600"
                          : ""
                      }`}
                    >
                      {property.prop_status === 1
                        ? "Ready To Buy"
                        : property.prop_status === 2
                        ? "Upcoming"
                        : property.prop_status === 3
                        ? "Sold"
                        : property.prop_status === 4
                        ? "Rented"
                        : ""}
                    </p>
                  </div>
                  {property.age && <p>Age: {property.age}</p>}
                  {property.city && <p>City: {property.city}</p>}
                  {property.locality && <p>Locality: {property.locality}</p>}
                  {property.previewImage && (
                    <img
                      src={property.previewImage}
                      alt="Property Preview"
                      className="w-full h-40 object-cover rounded-lg shadow-md mt-4"
                    />
                  )}
                  <div className="flex justify-end items-center mt-4">
                    <Link
                      to={"/user/property/details"}
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                      state={{ property_id: property._id }}
                    >
                      Read more{" "}
                      <IoIosArrowDropright title="Go to Details" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold text-gray-100">
              <p>No Property found...</p>
            </div>
          )}
        </div>
      </UserNavbar>
    </div>
  );
}

export default UserListProperties;
