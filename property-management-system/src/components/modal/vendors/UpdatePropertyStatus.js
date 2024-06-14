import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Option,
  Select,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { putServices } from "../../../apiServices/apiServices";

function UpdatePropertyStatus(props) {
  const [updateData, setUpdateData] = useState({
    prop_status: props.updateData.prop_status,
  });
  const access_token = localStorage.getItem("property_vendor_access_token");

  useEffect(() => {
    setUpdateData({ ...updateData, prop_status: props.updateData.prop_status });
  }, [props.updateData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await putServices(
        `/api/properties/manage/edit/status/${props.updateData._id}`,
        updateData,
        access_token
      );
      if (res.responseCode === 200) {
        toast.success("Status updated");
        props.onClose();
        props.fetchPropertyDetails();
      } else {
        toast.error(res.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Dialog open={props.open} handler={props.onClose}>
        <DialogHeader>Update Property Status</DialogHeader>

        <DialogBody>
          <Select
            label="Property status"
            // value={updateData.prop_status == 2 ? "Sold" : ""}
            onChange={(e) => setUpdateData({ ...updateData, prop_status: e })}
          >
            <Option value="1">Ready to Buy</Option>
            <Option value="2">Upcoming</Option>
            <Option value="3">Sold</Option>
            {/* <Option value="3">Rented</Option> */}
          </Select>
        </DialogBody>

        <DialogFooter>
          <>
            <Button
              variant="text"
              color="red"
              onClick={props.onClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" onClick={handleSubmit}>
              <span>Update</span>
            </Button>
          </>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default UpdatePropertyStatus;
