import React, { useEffect, useState } from "react";
import VendorNavbar from "../../components/VendorNavbar";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import { Input, Button, Spinner } from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";

function VendorProperties() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const access_token = localStorage.getItem("property_vendor_access_token");
  const decoded_token = jwtDecode(access_token);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPropertiesList();
  }, []);

  const fetchPropertiesList = async () => {
    setLoading(true);
    try {
      const res = await getServices(
        `/api/properties/manage/list?prop_status=&vendor_id=${decoded_token.id}`,
        access_token
      );
      if (res.responseCode === 200) {
        setData(res.responseData);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePropertySearch = async (e) => {
    try {
      const res = await getServices(
        `/api/properties/seach/filter?property_name=${e.target.value}&city=&locality=`
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

  const handleCreateProperty = () => {
    navigate("/vendor/manage_property", { state: { add_property: true } });
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-white">
      <VendorNavbar>
        <div className="container mx-auto px-4 mb-10 mt-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-4xl font-semibold">
              {data.length > 1 ? "Properties" : "Property"}
            </p>
            <div className="relative w-64">
              <Input
                label="Enter the Property name"
                onChange={handlePropertySearch}
                icon={
                  <IoSearch className="absolute left-3 top-2.5 h-5 w-5 text-white" />
                }
                className="pl-10 text-white bg-gray-700 border-0 rounded-lg placeholder-gray-400"
                inputClass="text-white bg-gray-700 border-0 placeholder-gray-400"
              />
            </div>
            <Button onClick={handleCreateProperty} className="ml-4">
              Add Property
            </Button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner className="h-12 w-12 text-white" />
            </div>
          ) : data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-4">
              {data.map((property, i) => (
                <div
                  key={i}
                  className="bg-white text-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
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
                  {property.images && property.images.length > 0 && (
                    <img
                      src={property.images[0]}
                      alt={property.property_name}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                  )}
                  {property.age && <p>Age: {property.age}</p>}
                  {property.city && <p>City: {property.city}</p>}
                  {property.locality && <p>Locality: {property.locality}</p>}
                  <div className="flex justify-end items-center mt-4">
                    <Link
                      to={"/vendor/property/details"}
                      className="flex items-center gap-2 text-blue-600 hover:underline"
                      state={{ property_id: property._id }}
                    >
                      Read more <IoIosArrowDropright title="Go to Details" />
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
      </VendorNavbar>
    </div>
  );
}

export default VendorProperties;
