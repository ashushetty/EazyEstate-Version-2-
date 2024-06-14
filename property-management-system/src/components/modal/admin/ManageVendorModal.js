import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import React from "react";

function ManageVendorModal(props) {
  return (
    <div>
      <Dialog open={props.open} handler={props.onClose}>
        {props.modal.accept && <DialogHeader>Accept Vendor</DialogHeader>}
        {props.modal.reject && <DialogHeader>Reject Vendor</DialogHeader>}
        {props.modal.accept && (
          <DialogBody>
            This is used when a new vendor has applied to do business with your
            company and goes through an approval process. If their application
            meets your requirements and passes any background checks, you can
            "accept" the vendor, allowing them to participate in bids or fulfill
            orders.
          </DialogBody>
        )}
        {props.modal.reject && (
          <DialogBody>
            If a new vendor's application doesn't meet your standards, you can
            "reject" them. This could be due to incomplete information, lack of
            qualifications, or failing to meet specific criteria. It's good
            practice to provide a reason for rejection to help the vendor
            improve their application for future attempts.
          </DialogBody>
        )}
        <DialogFooter>
          {props.modal.accept && (
            <>
              <Button
                variant="text"
                color="red"
                onClick={props.onClose}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="green"
                onClick={props.handleAcceptSubmit}
              >
                <span>Accept</span>
              </Button>
            </>
          )}
          {props.modal.reject && (
            <>
              <Button
                variant="text"
                color="red"
                onClick={props.onClose}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="red"
                onClick={props.handleRejectSubmit}
              >
                <span>Reject</span>
              </Button>
            </>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ManageVendorModal;
