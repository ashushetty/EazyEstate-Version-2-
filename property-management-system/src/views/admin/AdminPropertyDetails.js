import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminNavbar";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getServices, postServices } from "../../apiServices/apiServices";
import { Button, Carousel, Textarea } from "@material-tailwind/react";
import moment from "moment";

function AdminPropertyDetails() {
  const [data, setData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [addComment, setAdddComment] = useState({ comment: "" });
  const location = useLocation().state;
  const access_token = localStorage.getItem("property_admin_access_token");

  useEffect(() => {
    fetchPropertyDetails();
    fetchCommentsList();
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const res = await getServices(
        `/api/properties/manage/list/particular?property_id=${location.property_id}`,
        access_token
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postServices(
        `/api/comments/manage/post`,
        {
          property_id: location.property_id,
          comment: addComment.comment,
        },
        access_token
      );
      if (res.responseCode === 200) {
        toast.success("Comment added");
        fetchCommentsList();
      } else {
        toast.error(res.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-green-400 min-h-screen text-white">
      <AdminSidebar>
        <div className="w-full pl-3 pr-3 mb-10 mt-3">
          <div className="flex items-center justify-between">
            <p className="text-4xl font-semibold">Property Details</p>
            {data && <p className="text-right">Posted on: {data.posted_on}</p>}
          </div>

          <div>
            <Carousel className="rounded-xl mt-5">
              {data?.images?.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt="image 1"
                  className="h-full w-full object-cover max-h-[500px]"
                />
              ))}
            </Carousel>
          </div>

          {data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="bg-white text-black rounded-lg p-3 flex flex-col gap-2">
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
              <div className="bg-white text-black rounded-lg p-3 flex flex-col gap-2">
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
            ""
          )}

          <div>
            <p className="text-2xl font-semibold">Comments</p>
            <form
              onSubmit={handleCommentSubmit}
              className="mt-3 md:max-w-[50%]"
            >
              <Textarea
                label="Add Comments"
                onChange={(e) =>
                  setAdddComment({ ...addComment, comment: e.target.value })
                }
                value={addComment.comment}
                className=" w-full"
                required
              />
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>

          {commentData.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
              {commentData.map((comment, i) => (
                <div key={i} className="bg-blue-gray-100 p-2 rounded-lg text-black">
                  <p>{comment.comment}</p>
                  <p className="text-right text-gray-600">Admin</p>
                  <p className="text-right text-gray-600">
                    {moment(comment.posted_on).format("DD/MM/YYYY HH:mm")}
                  </p>
                  <div className="flex flex-col gap-2 mt-2">
                    {comment.replies.map((reply, i) => (
                      <div
                        key={i}
                        className="bg-gray-700 text-white p-1 rounded "
                      >
                        {reply.replycmt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold mt-2">
              <p>No comments found</p>
            </div>
          )}
        </div>
      </AdminSidebar>
    </div>
  );
}

export default AdminPropertyDetails;
