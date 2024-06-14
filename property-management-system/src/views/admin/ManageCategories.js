import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminNavbar";
import { Button, CardHeader, Typography } from "@material-tailwind/react";
import ManageCategoriesModal from "../../components/modal/admin/ManageCategoriesModal";
import toast from "react-hot-toast";
import {
  deleteServices,
  getServices,
  postServices,
  putServices,
} from "../../apiServices/apiServices";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function ManageCategories() {
  const [modal, setModal] = useState({ add: false, edit: false });
  const [data, setData] = useState([]);
  const [addData, setAddData] = useState({ cat_name: "" });
  const access_token = localStorage.getItem("property_admin_access_token");

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const fetchCategoriesList = async () => {
    try {
      const res = await getServices(`/api/category/manage/list`);
      if (res.responseCode === 200) {
        setData(res.responseData);
      } else {
        setData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAddCategoryModal = () => {
    setModal({ ...modal, add: !modal.add });
    setAddData({
      ...addData,
      cat_name: "",
    });
  };

  const handleAddSubmit = async () => {
    if (addData.cat_name.length <= 0) {
      alert("Please enter the category name");
    } else {
      try {
        const res = await postServices(
          `/api/category/manage/add`,
          addData,
          access_token
        );
        if (res.responseCode === 200) {
          fetchCategoriesList();
          setModal({ ...modal, add: false });
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleDeleteCategory = async (category_data) => {
    if (window.confirm("Do you want delete this category?")) {
      try {
        const res = await deleteServices(
          `/api/category/manage/delete/${category_data._id}`
        );
        if (res.responseCode === 200) {
          fetchCategoriesList();
          toast.success("Category deleted");
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleUpdateCategoryModal = (category_data) => {
    setModal({ ...modal, edit: !modal.edit });
    setAddData({
      ...addData,
      cat_name: category_data.name,
      id: category_data._id,
    });
  };

  const handleUpdateSubmit = async () => {
    if (addData.cat_name.length <= 0) {
      alert("Please enter the category name");
    } else {
      try {
        const res = await putServices(
          `/api/category/manage/update/${addData.id}`,
          addData,
          access_token
        );
        if (res.responseCode === 200) {
          fetchCategoriesList();
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
                Manage Categories
              </Typography>
            </div>
            <Button onClick={handleAddCategoryModal}>Add Category</Button>
          </div>
          {data.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 my-4 ">
              {data.map((category, i) => (
                <div
                  key={i}
                  className="bg-blue-gray-50 p-3 text-black rounded-md hover:drop-shadow-xl transition-all duration-300 flex justify-between items-center"
                >
                  <Link
                    to={"/admin/manage_sub_categories"}
                    state={{ category_id: category._id }}
                  >
                    {category.name}
                  </Link>
                  <div className="flex gap-2">
                    <MdEdit
                      className="cursor-pointer"
                      onClick={() => handleUpdateCategoryModal(category)}
                    />
                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => handleDeleteCategory(category)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center font-bold">
              <p>No Categories found...</p>
            </div>
          )}
        </div>
      </AdminSidebar>

      <ManageCategoriesModal
        open={modal.add}
        onClose={() => setModal({ ...modal, add: false })}
        modal={modal}
        setAddData={setAddData}
        addData={addData}
        handleAddSubmit={handleAddSubmit}
      />
      <ManageCategoriesModal
        open={modal.edit}
        onClose={() => setModal({ ...modal, edit: false })}
        modal={modal}
        setAddData={setAddData}
        addData={addData}
        handleUpdateSubmit={handleUpdateSubmit}
      />
    </div>
  );
}

export default ManageCategories;
