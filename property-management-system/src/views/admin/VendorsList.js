import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminNavbar";
import { CardHeader, Input, Typography } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import VendorsListTable from "../../components/tables/admin/VendorsListTable";
import { getServices } from "../../apiServices/apiServices";
import toast from "react-hot-toast";

const TABLE_HEAD = ["Vendor", "Phone"];

function VendorsList() {
  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("property_admin_access_token");

  useEffect(() => {
    fetchVendorApprovedList();
  }, []);

  const fetchVendorApprovedList = async () => {
    try {
      const res = await getServices(
        `/api/admin/vendor/list?status=2`,
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
        <div className="w-full pl-3 pr-10 mb-10 mt-3">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <Typography variant="h5" color="white">
                Vendors
              </Typography>
              <Typography color="black" className="mt-1 font-normal">
                See information about all vendors
              </Typography>
            </div>
            {/* <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div> */}
          </div>
          {data.length > 0 ? (
            <VendorsListTable TABLE_HEAD={TABLE_HEAD} TABLE_ROWS={data} />
          ) : (
            <div className="text-center font-bold">
              <p>No Vendors found...</p>
            </div>
          )}
        </div>
      </AdminSidebar>
    </div>
  );
}

export default VendorsList;
