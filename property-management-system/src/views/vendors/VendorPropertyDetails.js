import React, { useEffect, useState } from "react";
import VendorNavbar from "../../components/VendorNavbar";
import { deleteServices, getServices } from "../../apiServices/apiServices";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import {
  Button,
  Carousel,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import UpdatePropertyStatus from "../../components/modal/vendors/UpdatePropertyStatus";
import moment from "moment";
import ReplyCommentModal from "../../components/modal/vendors/ReplyCommentModal";

function VendorPropertyDetails() {
  const [data, setData] = useState({});
  const [modal, setModal] = useState({
    update_property_status: false,
    reply_comment: false,
  });
  const [commentData, setCommentData] = useState([]);
  const [replyUpdateData, setReplyUpdateData] = useState({});
  const location = useLocation().state;
  const navigate = useNavigate();
  const access_token = localStorage.getItem("property_vendor_access_token");

  useEffect(() => {
    fetchPropertyDetails();
    fetchCommentsList();
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const res = await getServices(
        `/api/properties/manage/list/particular?property_id=${location.property_id}`
      );
      if (res.responseCode === 200) {
        setData(res.responseData[0]);
      } else {
        setData({});
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDeleteProperty = async () => {
    if (window.confirm("Do you want delete this property?")) {
      try {
        const res = await deleteServices(
          `/api/properties/manage/delete/${location.property_id}`,
          access_token
        );
        if (res.responseCode === 200) {
          toast.success("Property deleted");
          navigate(-1);
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const fetchCommentsList = async () => {
    try {
      const res = await getServices(
        `/api/comments/manage/list?property_id=${location.property_id}`,
        access_token
      );
      if (res.responseCode === 200) {
        setCommentData(res.responseData);
      } else {
        toast.error(res.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleUpdateProperty = () => {
    navigate("/vendor/manage_property", {
      state: { update_property: true, update_data: data },
    });
  };

  const handlePropertyStatusModal = () => {
    setModal({ ...modal, update_property_status: true });
  };

  const handleReplyComment = (comment_data) => {
    setModal({ ...modal, reply_comment: true });
    setReplyUpdateData(comment_data);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-white">
      <VendorNavbar>
        <div className="container mx-auto px-4 mb-10 mt-3">
          <div className="flex justify-between items-center">
            <p className="text-4xl font-semibold">Property Details</p>
            <div className="flex items-center gap-3">
              <Menu>
                <MenuHandler>
                  <Button className="bg-gray-800 p-0 rounded-full">
                    <MdOutlineEdit className="text-3xl text-white p-1" />
                  </Button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={handleUpdateProperty}>
                    Update Property
                  </MenuItem>
                  <MenuItem onClick={handlePropertyStatusModal}>
                    Update Property status
                  </MenuItem>
                </MenuList>
              </Menu>

              <MdOutlineDelete
                onClick={() => handleDeleteProperty()}
                className="text-3xl bg-gray-800 text-white p-1 rounded-full cursor-pointer"
              />
            </div>
          </div>

          <div>
            <Carousel className="rounded-xl mt-5">
              {data?.images?.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt="Property Image"
                  className="h-full w-full object-cover max-h-[500px]"
                />
              ))}
            </Carousel>
          </div>

          <div className="flex justify-end items-center">
            {data && <p className="text-right">Posted on: {data.posted_on}</p>}
          </div>
          {data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="bg-blue-gray-50 rounded-lg p-3 flex flex-col gap-2 text-gray-800">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-xl">{data.property_name}</p>
                  <p className="font-semibold text-xl">₹{data.price}/-</p>
                </div>
                <p>
                  Age: <span className="font-semibold">{data.age}</span>
                </p>
                <p>
                  City: <span className="font-semibold">{data.city}</span>
                </p>
                <p>
                  Description:{" "}
                  <span className="font-semibold">{data.description}</span>
                </p>
                <p>
                  Locality:{" "}
                  <span className="font-semibold">{data.locality}</span>
                </p>
                <p>
                  Pay on Month:{" "}
                  <span className="font-semibold">
                    {data.pay_on_month === 1
                      ? "Yes"
                      : data.pay_on_month === 0
                      ? "No"
                      : ""}
                  </span>
                </p>
                <p>
                  Category:{" "}
                  <span className="font-semibold">
                    {data.categoryInfo?.name}
                  </span>
                </p>
                <p>
                  Sub-Category:{" "}
                  <span className="font-semibold">
                    {data.subcategoryInfo?.name}
                  </span>
                </p>
              </div>
              <div className="bg-blue-gray-50 rounded-lg p-3 flex flex-col gap-2 text-gray-800">
                <div className="flex justify-between items-center">
                  <p>
                    Balconies:{" "}
                    <span className="font-semibold">{data.balconies}</span>
                  </p>
                  <p className="text-red-500 bg-red-100 px-2 rounded font-semibold">
                    {data.prop_status === 1
                      ? "Ready To Buy"
                      : data.prop_status === 2
                      ? "Upcoming"
                      : data.prop_status === 3
                      ? "Sold"
                      : data.prop_status === 4
                      ? "Rented"
                      : ""}
                  </p>
                </div>
                <p>
                  Bathrooms:{" "}
                  <span className="font-semibold">{data.bathrooms}</span>
                </p>
                <p>
                  Bedrooms:{" "}
                  <span className="font-semibold">{data.bedrooms}</span>
                </p>
                <p>
                  Flooring:{" "}
                  <span className="font-semibold">{data.flooring}</span>
                </p>
                <p>
                  Lift: <span className="font-semibold">{data.lift}</span>
                </p>
                <p>
                  Parking: <span className="font-semibold">{data.parking}</span>
                </p>
                <p>
                  Deposit: <span className="font-semibold">{data.deposit}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center font-bold text-gray-100">
              <p>No Property found...</p>
            </div>
          )}

          <div>
            <p className="text-2xl font-semibold">Comments</p>
            {commentData.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                {commentData.map((comment, i) => (
                  <div key={i} className="bg-blue-gray-100 p-2 rounded-lg text-gray-800">
                    <p>{comment.comment}</p>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center">
                      <p
                        className="font-semibold cursor-pointer"
                        onClick={() => handleReplyComment(comment)}
                      >
                        Reply
                      </p>
                      <div>
                        <p className="text-right text-gray-600">Admin</p>
                        <p className="text-right text-gray-600">
                          {moment(comment.posted_on).format("DD/MM/YYYY HH:mm")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                      {comment.replies.map((reply, i) => (
                        <div
                          key={i}
                          className="bg-gray-700 text-white p-1 rounded"
                        >
                          {reply.replycmt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center font-bold mt-2 text-gray-100">
                <p>No comments found</p>
              </div>
            )}
          </div>
        </div>
      </VendorNavbar>

      <UpdatePropertyStatus
        open={modal.update_property_status}
        onClose={() => setModal({ ...modal, update_property_status: false })}
        updateData={data}
        fetchPropertyDetails={fetchPropertyDetails}
      />
      <ReplyCommentModal
        open={modal.reply_comment}
        onClose={() => setModal({ ...modal, reply_comment: false })}
        fetchCommentsList={fetchCommentsList}
        replyUpdateData={replyUpdateData}
      />
    </div>
  );
}

export default VendorPropertyDetails;

