import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminNavbar";
import TableList from "../../components/tables/admin/VendorsRequestList";
import { CardHeader, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";
import { getServices } from "../../apiServices/apiServices";

const TABLE_HEAD = ["Vendor", "Phone", "Actions"];

function ManageVendor() {
  const [data, setData] = useState([]);
  const access_token = localStorage.getItem("property_admin_access_token");

  useEffect(() => {
    fetchVendorRequestList();
  }, []);

  const fetchVendorRequestList = async () => {
    try {
      const res = await getServices(
        `/api/admin/vendor/list?status=1`,
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
    <div className="bg-gradient-to-br from-blue-500 to-green-500 min-h-screen">
      <AdminSidebar>
        <div className="w-full pl-3 pr-10 mb-10 mt-3">
          <CardHeader
            floated={false}
            shadow={false}
            className="rounded-none bg-transparent"
          >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                <Typography variant="h5" color="white">
                  Vendors Requests
                </Typography>
                <Typography color="white" className="mt-1 font-normal">
                  See information about all vendor requests
                </Typography>
              </div>
            </div>
          </CardHeader>
          {data.length > 0 ? (
            <TableList
              TABLE_HEAD={TABLE_HEAD}
              TABLE_ROWS={data}
              fetchVendorRequestList={fetchVendorRequestList}
            />
          ) : (
            <div className="text-center font-bold text-white">
              <p>No Requests found...</p>
            </div>
          )}
        </div>
      </AdminSidebar>
    </div>
  );
}

export default ManageVendor;
