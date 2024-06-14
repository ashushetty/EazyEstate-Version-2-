import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteServices, getServices } from "../../apiServices/apiServices";

function UserWishlist() {
  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("property_user_access_token");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await getServices(`/api/user/my/wishlists`, access_token);
      if (res.responseCode === 200) {
        setData(res.responseData);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRemoveWishlist = async (id) => {
    try {
      const res = await deleteServices(
        `/api/user/wishlist/remove/${id}`,
        access_token
      );
      if (res.responseCode === 200) {
        fetchWishlist();
      } else {
        toast.error(res.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-white">
      <UserNavbar>
        <div className="container mx-auto px-4 mb-10 mt-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-4xl font-semibold">
              {data.length > 1 ? "Wishlist Items" : "Wishlist Item"}
            </p>
          </div>
          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4">
              {data.map((property, i) => (
                <div
                  key={i}
                  className="bg-white text-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
                >
                  <div className="absolute top-0 right-0 m-2">
                    <MdOutlineDelete
                      onClick={() => handleRemoveWishlist(property._id)}
                      className="text-gray-600 hover:text-red-500 text-2xl cursor-pointer"
                    />
                  </div>
                  <div className="mb-3">
                    <img
                      src={property.propertyInfo.images[0]} // Displaying the first image
                      alt="Property Image"
                      className="w-full h-36 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">
                      {property.propertyInfo.property_name}
                    </p>
                  </div>
                  <p className="text-gray-600">
                    City:{" "}
                    <span className="font-semibold">
                      {property.propertyInfo.city}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Locality:{" "}
                    <span className="font-semibold">
                      {property.propertyInfo.locality}
                    </span>
                  </p>
                  <div className="flex justify-end items-center mt-3">
                    <Link
                      to={"/user/property/details"}
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                      state={{ property_id: property.propertyInfo._id }}
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
              <p>No items in your wishlist...</p>
            </div>
          )}
        </div>
      </UserNavbar>
    </div>
  );
}

export default UserWishlist;
