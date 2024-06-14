import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminNavbar";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";
import { IoIosArrowDropright } from "react-icons/io";

function ListProperties() {
  const [data, setData] = useState([]);
  const location = useLocation().state;
  const access_token = localStorage.getItem("property_admin_access_token");

  useEffect(() => {
    fetchVendorProperties();
  }, []);

  const fetchVendorProperties = async () => {
    try {
      const res = await getServices(
        `/api/properties/manage/list?prop_status=&vendor_id=${location.vendor_id}`,
        access_token
      );
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
    <div className="bg-gradient-to-br from-blue-500 to-green-400 min-h-screen text-white">
      <AdminSidebar>
        <div className="w-full pl-3 pr-3 mb-10 mt-3">
          <p className="text-4xl font-semibold">
            {data.length > 1
              ? `${location.name}'s Properties`
              : `${location.name}'s Property`}
          </p>

          {data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 my-4">
              {data.map((property, i) => (
                <div
                  key={i}
                  className="bg-white text-black p-3 rounded-md hover:drop-shadow-xl transition-all duration-300 flex flex-col gap-2"
                >
                  {property.images && property.images.length > 0 && (
                    <img
                      src={property.images[0]}
                      alt={property.property_name}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  <div className="flex items-center justify-between w-full">
                    <Link
                      to={"/admin/vendor/property/details"}
                      className="font-semibold text-xl"
                      state={{ property_id: property._id }}
                    >
                      {property.property_name}
                    </Link>
                    <p className="text-red-500 bg-red-100 px-2 rounded">
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
                  <div className="flex justify-end items-center hover:underline">
                    <Link
                      to={"/admin/vendor/property/details"}
                      className="flex items-center gap-2"
                      state={{ property_id: property._id }}
                    >
                      Read more <IoIosArrowDropright title="Go to Details" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold">
              <p>No Property found...</p>
            </div>
          )}
        </div>
      </AdminSidebar>
    </div>
  );
}

export default ListProperties;
