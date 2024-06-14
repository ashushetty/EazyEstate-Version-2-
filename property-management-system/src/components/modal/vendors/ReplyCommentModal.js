import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
} from "@material-tailwind/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { postServices } from "../../../apiServices/apiServices";

function ReplyCommentModal(props) {
  const [replyComment, setReplyComment] = useState({ reply: "" });
  const access_token = localStorage.getItem("property_vendor_access_token");

  const handleReplySubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await postServices(
        `/api/comments/manage/reply`,
        {
          comment_id: props.replyUpdateData._id,
          reply: replyComment.reply,
        },
        access_token
      );
      if (res.responseCode === 200) {
        props.fetchCommentsList();
        props.onClose();
        setReplyComment({ ...replyComment, reply: "" });
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
        <form onSubmit={handleReplySubmit}>
          <DialogHeader>Reply comment</DialogHeader>

          <DialogBody>
            <Textarea
              label="Reply comment"
              value={replyComment.reply}
              onChange={(e) =>
                setReplyComment({ ...replyComment, reply: e.target.value })
              }
              required
            />
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
              <Button variant="gradient" type="submit">
                Reply
              </Button>
            </>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

export default ReplyCommentModal;
