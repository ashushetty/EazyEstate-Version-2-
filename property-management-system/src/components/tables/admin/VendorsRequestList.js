import React, { useState } from "react";
import { Card, Typography, CardBody, Button } from "@material-tailwind/react";
import ManageVendorModal from "../../modal/admin/ManageVendorModal";
import toast from "react-hot-toast";
import { putServices } from "../../../apiServices/apiServices";

function TableList(props) {
  const [modal, setModal] = useState({ accept: false, reject: false });
  const [vendorData, setVendorData] = useState({ id: "" });
  const access_token = localStorage.getItem("property_admin_access_token");

  const handleAcceptModal = (vendor_data) => {
     console.log(vendor_data);
    setModal({ ...modal, accept: !modal.accept });
    setVendorData({ ...vendorData, id: vendor_data.vendor_id });
  };

  const handleRejectModal = (vendor_data) => {
    setModal({ ...modal, reject: !modal.reject });
    setVendorData({ ...vendorData, id: vendor_data.vendor_id });
  };

  const handleAcceptSubmit = async () => {
    //  console.log(vendorData);
    try {
      const res = await putServices(
        `/api/admin/accept/vendor?vendor_id=${vendorData.id}`,
        { verify_status: "2" },
        access_token
      );
      if (res.responseCode === 200) {
        props.fetchVendorRequestList();
        toast.success("Vendor request approved...");
        setModal({ ...modal, accept: false });
      } else {
        toast.error(res.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleRejectSubmit = async () => {
    try {
      const res = await putServices(
        `/api/admin/accept/vendor?vendor_id=${vendorData.id}`,
        { verify_status: 3 },
        access_token
      );
      if (res.responseCode === 200) {
        props.fetchVendorRequestList();
        toast.success("Vendor request rejected...");
        setModal({ ...modal, reject: false });
      } else {
        toast.error(res.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Card>
        <CardBody className="overflow-scroll lg:overflow-auto px-0">
          <table className="w-full table-auto text-left">
            <thead>
              <tr>
                {props.TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.TABLE_ROWS.map((vendor, index) => {
                const isLast = index === props.TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {/* <Avatar src={img} alt={name} size="sm" /> */}
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {vendor.name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {vendor.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {vendor.phone}
                      </Typography>
                    </td>
                    <td
                      className={`${
                        isLast ? "p-4" : "p-4 border-b border-blue-gray-50"
                      } w-[18%]`}
                    >
                      <Button
                        className="bg-green-500"
                        onClick={() => handleAcceptModal(vendor)}
                      >
                        Accept
                      </Button>
                      <Button
                        className=" mt-3 2xl:mt-0 2xl:ml-4 bg-red-500"
                        onClick={() => handleRejectModal(vendor)}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <ManageVendorModal
        open={modal.accept}
        onClose={() => setModal({ ...modal, accept: false })}
        modal={modal}
        handleAcceptSubmit={handleAcceptSubmit}
      />
      <ManageVendorModal
        open={modal.reject}
        onClose={() => setModal({ ...modal, reject: false })}
        modal={modal}
        handleRejectSubmit={handleRejectSubmit}
      />
    </>
  );
}

export default TableList;
