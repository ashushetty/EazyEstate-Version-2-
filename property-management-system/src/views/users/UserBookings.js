import React, { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";
import { Link } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";

function UserBookings() {
  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("property_user_access_token");

  useEffect(() => {
    fetchBookingsList();
  }, []);

  const fetchBookingsList = async () => {
    try {
      const res = await getServices(`/api/property/bookings/list`, access_token);
      if (res.responseCode === 200) {
        setData(res.responseData);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-white">
      <UserNavbar>
        <div className="container mx-auto px-4 mb-10 mt-3">
          <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
          {data.length > 0 ? (
            <div className="flex flex-col gap-6">
              {data.map((property, i) => (
                <div
                  className="bg-white text-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  key={i}
                >
                  <div className="flex justify-end mb-2">
                    <p
                      className={`px-3 py-1 rounded-full text-sm ${
                        property.isaccepted === 0
                          ? "bg-red-300 text-red-800"
                          : "bg-green-300 text-green-800"
                      }`}
                    >
                      {property.isaccepted === 0
                        ? "Pending"
                        : property.isaccepted === 1
                        ? "Accepted"
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-4 items-center">
                      {property.propertyInfo.images && (
                        <img
                          src={property.propertyInfo.images[0]} // Displaying the first image as preview
                          alt="Property Image"
                          className="w-40 h-40 object-cover rounded-lg shadow-md"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-xl">
                          {property.propertyInfo.property_name}
                        </p>
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
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Booked on:{" "}
                      {new Date(property.booked_on).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex justify-end items-center mt-4">
                    <Link
                      to={"/user/property/details"}
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                      state={{ property_id: property.propertyInfo.property_id }}
                    >
                      Read more{" "}
                      <IoIosArrowDropright title="Go to Details" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-2xl font-bold text-gray-100">
                You have no bookings...
              </p>
            </div>
          )}
        </div>
      </UserNavbar>
    </div>
  );
}

export default UserBookings;
