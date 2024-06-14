import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminNavbar";
import { Button, Typography } from "@material-tailwind/react";
import ManageSubCategoriesModal from "../../components/modal/admin/ManageSubCategoriesModal";
import toast from "react-hot-toast";
import {
  deleteServices,
  getServices,
  postServices,
  putServices,
} from "../../apiServices/apiServices";
import { useLocation } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";

function ManageSubCategory() {
  const [modal, setModal] = useState({ add: false, edit: false });
  const [data, setData] = useState([]);
  const location = useLocation().state;
  const [addData, setAddData] = useState({ sub_cat_name: "" });
  const access_token = localStorage.getItem("property_admin_access_token");

  useEffect(() => {
    fetchSubCategoriesList();
  }, []);

  const fetchSubCategoriesList = async () => {
    try {
      const res = await getServices(
        `/api/subcategory/manage/list?category_id=${location.category_id}`
      );
      if (res.responseCode === 200) {
        setData(res.responseData[0]);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAddSubCategoryModal = () => {
    setModal({ ...modal, add: !modal.add });
    setAddData({
      ...addData,
      sub_cat_name: "",
    });
  };

  const handleAddSubmit = async () => {
    if (addData.sub_cat_name.length <= 0) {
      alert("Please enter the sub-category name");
    } else {
      try {
        const res = await postServices(
          `/api/subcategory/manage/add`,
          {
            sub_cat_name: addData.sub_cat_name,
            category_id: location.category_id,
          },
          access_token
        );
        if (res.responseCode === 200) {
          fetchSubCategoriesList();
          setModal({ ...modal, add: false });
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleDeleteSubCategory = async (subcategory_data) => {
    if (window.confirm("Do you want delete this sub-category?")) {
      try {
        const res = await deleteServices(
          `/api/subcategory/manage/delete/${subcategory_data._id}`
        );
        if (res.responseCode === 200) {
          fetchSubCategoriesList();
          toast.success("Sub-Category deleted");
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleUpdateSubCategoryModal = (subcategory_data) => {
    setModal({ ...modal, edit: !modal.edit });
    setAddData({
      ...addData,
      sub_cat_name: subcategory_data.name,
      id: subcategory_data._id,
    });
  };

  const handleUpdateSubCategorySubmit = async () => {
    if (addData.sub_cat_name.length <= 0) {
      alert("Please enter the sub-category name");
    } else {
      try {
        const res = await putServices(
          `/api/subcategory/manage/update/${addData.id}`,
          { sub_cat_name: addData.sub_cat_name },
          access_token
        );
        if (res.responseCode === 200) {
          fetchSubCategoriesList();
          setModal({ ...modal, edit: false });
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-green-400 min-h-screen text-white">
      <AdminSidebar>
        <div className="w-full pl-3 pr-3 mb-10 mt-3">
          <div className="flex items-center justify-between gap-4 flex-row">
            <div>
              <Typography variant="h5" color="white">
                Manage Sub-Categories
              </Typography>
            </div>
            <Button onClick={handleAddSubCategoryModal}>
              Add Sub-Category
            </Button>
          </div>
          {data?.subCategories?.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 my-4">
              {data?.subCategories?.map((sub_category, i) => (
                <div
                  key={i}
                  className="bg-blue-gray-50 p-3 text-black rounded-md hover:drop-shadow-xl transition-all duration-300 flex justify-between items-center"
                >
                  <p>{sub_category.name}</p>
                  <div className="flex gap-2">
                    <MdEdit
                      className="cursor-pointer"
                      onClick={() => handleUpdateSubCategoryModal(sub_category)}
                    />
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => handleDeleteSubCategory(sub_category)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold">
              <p>No Sub-Categories found...</p>
            </div>
          )}
        </div>
      </AdminSidebar>

      <ManageSubCategoriesModal
        open={modal.add}
        onClose={() => setModal({ ...modal, add: false })}
        modal={modal}
        setAddData={setAddData}
        addData={addData}
        handleAddSubmit={handleAddSubmit}
      />
      <ManageSubCategoriesModal
        open={modal.edit}
        onClose={() => setModal({ ...modal, edit: false })}
        modal={modal}
        setAddData={setAddData}
        addData={addData}
        handleUpdateSubCategorySubmit={handleUpdateSubCategorySubmit}
      />
    </div>
  );
}

export default ManageSubCategory;
