import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React from "react";

function ManageCategoriesModal(props) {
  return (
    <div>
      <Dialog open={props.open} handler={props.onClose}>
        {props.modal.add && <DialogHeader>Add Category</DialogHeader>}
        {props.modal.edit && <DialogHeader>Update Category</DialogHeader>}
        {props.modal.add && (
          <DialogBody>
            <Input
              label="Enter category name"
              onChange={(e) =>
                props.setAddData({ ...props.addData, cat_name: e.target.value })
              }
              value={props.addData.cat_name}
            />
          </DialogBody>
        )}
        {props.modal.edit && (
          <DialogBody>
            <Input
              label="Enter category name"
              onChange={(e) =>
                props.setAddData({ ...props.addData, cat_name: e.target.value })
              }
              value={props.addData.cat_name}
            />
          </DialogBody>
        )}
        <DialogFooter>
          {props.modal.add && (
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
                onClick={props.handleAddSubmit}
              >
                <span>Save</span>
              </Button>
            </>
          )}

          {props.modal.edit && (
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
                onClick={props.handleUpdateSubmit}
              >
                <span>Update</span>
              </Button>
            </>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default ManageCategoriesModal;
