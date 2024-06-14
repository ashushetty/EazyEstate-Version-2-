import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import React from "react";

function ManageSubCategoriesModal(props) {
  return (
    <div>
      <Dialog open={props.open} handler={props.onClose}>
        {props.modal.add && <DialogHeader>Add Sub-Category</DialogHeader>}
        {props.modal.edit && <DialogHeader>Update Sub-Category</DialogHeader>}
        {props.modal.add && (
          <DialogBody>
            <Input
              label="Enter category name"
              value={props.addData.sub_cat_name}
              onChange={(e) =>
                props.setAddData({
                  ...props.addData,
                  sub_cat_name: e.target.value,
                })
              }
            />
          </DialogBody>
        )}
        {props.modal.edit && (
          <DialogBody>
            <Input
              label="Enter category name"
              value={props.addData.sub_cat_name}
              onChange={(e) =>
                props.setAddData({
                  ...props.addData,
                  sub_cat_name: e.target.value,
                })
              }
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
                onClick={props.handleUpdateSubCategorySubmit}
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

export default ManageSubCategoriesModal;
