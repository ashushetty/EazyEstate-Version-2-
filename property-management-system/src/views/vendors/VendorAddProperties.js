import React, { useEffect, useState } from "react";
import VendorNavbar from "../../components/VendorNavbar";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import {
  getServices,
  postServices,
  putServices,
} from "../../apiServices/apiServices";
import toast from "react-hot-toast";
import { HiOutlineXMark } from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router-dom";

function VendorAddProperties() {
  const [categoryData, setCategoryData] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [addData, setAddData] = useState({
    property_name: "",
    city: "",
    locality: "",
    bedrooms: "",
    balconies: "",
    bathrooms: "",
    description: "",
    prop_status: "",
    lift: "",
    parking: "",
    age: "",
    flooring: "",
    price: "",
    deposit: "",
    pay_on_month: "",
    category: "",
    subcategory: "",
  });
  const [updateData, setUpdateData] = useState({
    property_name: "",
    city: "",
    locality: "",
    description: "",
    age: "",
    flooring: "",
    price: "",
    id: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(""); // State to hold preview URL of the first image
  const access_token = localStorage.getItem("property_vendor_access_token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation().state;

  useEffect(() => {
    fetchCategoryData();

    setUpdateData({
      ...updateData,
      id: location?.update_data?._id,
      property_name: location?.update_data?.property_name,
      city: location?.update_data?.city,
      locality: location?.update_data?.locality,
      age: location?.update_data?.age,
      description: location?.update_data?.description,
      flooring: location?.update_data?.flooring,
      price: location?.update_data?.price,
    });
  }, []);

  const fetchCategoryData = async () => {
    try {
      const res = await getServices(`/api/category/manage/list`);
      if (res.responseCode === 200) {
        setCategoryData(res.responseData);
      } else {
        setCategoryData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchSubCategoryData = async (id) => {
    try {
      const res = await getServices(
        `/api/subcategory/manage/list?category_id=${id}`
      );
      if (res.responseCode === 200) {
        setSubCategoryData(res.responseData[0]);
      } else {
        setSubCategoryData([]);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files);
    const validImages = newImages.filter(
      (image) => image.size <= 5 * 1024 * 1024
    ); // 5MB in bytes

    if (validImages.length + selectedImages.length > 5) {
      alert("You can only select a maximum of 5 images");
      return;
    }

    setSelectedImages([...selectedImages, ...validImages]);

    // Set preview URL for the first image
    if (validImages.length > 0) {
      setPreviewUrl(URL.createObjectURL(validImages[0]));
    }

    setPreviewUrls([
      ...previewUrls,
      ...validImages.map((image) => URL.createObjectURL(image)),
    ]);
  };

  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));

    // Reset preview URL if the first image is deleted
    if (index === 0 && selectedImages.length > 1) {
      setPreviewUrl(URL.createObjectURL(selectedImages[1]));
    } else if (index === 0) {
      setPreviewUrl("");
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (addData.category.length <= 0) {
      alert("Please select category");
    } else if (addData.subcategory && addData.subcategory.length <= 0) {
      alert("Please select sub-category");
    } else if (addData.prop_status.length <= 0) {
      alert("Please select property status");
    } else if (addData.lift.length <= 0) {
      alert("Please select is lift available");
    } else if (addData.parking.length <= 0) {
      alert("Please select is parking available");
    } else if (addData.pay_on_month.length <= 0) {
      alert("Please select is pay on month");
    } else {
      const formData = new FormData();

      formData.append("property_name", addData.property_name);
      formData.append("city", addData.city);
      formData.append("locality", addData.locality);
      formData.append("bedrooms", addData.bedrooms);
      formData.append("balconies", addData.balconies);
      formData.append("bathrooms", addData.bathrooms);
      formData.append("description", addData.description);
      formData.append("prop_status", addData.prop_status);
      formData.append("lift", addData.lift);
      formData.append("parking", addData.parking);
      formData.append("age", addData.age);
      formData.append("flooring", addData.flooring);
      formData.append("price", addData.price);
      formData.append("deposit", addData.deposit);
      formData.append("pay_on_month", addData.pay_on_month);
      formData.append("category", addData.category);
      formData.append("subcategory", addData.subcategory);

      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("images", selectedImages[i]);
      }

      try {
        const res = await postServices(
          `/api/properties/manage/post`,
          formData,
          access_token
        );
        setLoading(false);
        if (res.responseCode === 200) {
          navigate(-1);
          toast.success("Property added");
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleUpdateProperty = async (e) => {
    e.preventDefault();

    try {
      const res = await putServices(
        `/api/properties/manage/edit/${updateData.id}`,
        updateData,
        access_token
      );
      if (res.responseCode === 200) {
        toast.success("Property updated");
        navigate(-1);
      } else {
        toast.error(res.responseMessage);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-white">
      <VendorNavbar>
        {location.add_property && (
          <div className="container mx-auto px-4 mb-10 mt-3">
            <p className="text-4xl font-semibold mb-3">Add Property</p>

            <form onSubmit={handleAddSubmit}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
                <Input
                  label="Property name"
                  value={addData.property_name}
                  onChange={(e) =>
                    setAddData({ ...addData, property_name: e.target.value })
                  }
                  required
                />
                <Input
                  label="City"
                  value={addData.city}
                  onChange={(e) =>
                    setAddData({ ...addData, city: e.target.value })
                  }
                  required
                />
                <Input
                  label="Locality"
                  value={addData.locality}
                  onChange={(e) =>
                    setAddData({ ...addData, locality: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  min={1}
                  label="Number of Bedrooms"
                  value={addData.bedrooms}
                  onChange={(e) =>
                    setAddData({ ...addData, bedrooms: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  min={1}
                  label="Number of Balconies"
                  value={addData.balconies}
                  onChange={(e) =>
                    setAddData({ ...addData, balconies: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  min={1}
                  label="Number of Bathrooms"
                  value={addData.bathrooms}
                  onChange={(e) =>
                    setAddData({ ...addData, bathrooms: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  min={0}
                  label="Age (in years)"
                  value={addData.age}
                  onChange={(e) =>
                    setAddData({ ...addData, age: e.target.value })
                  }
                  required
                />
                <Select
                  label="Property status"
                  onChange={(e) => setAddData({
                    ...addData, prop_status: e })}
                  className="text-black"
                >
                  <Option value="0">Ready to Buy</Option>
                  <Option value="1">Upcoming</Option>
                  <Option value="2">Sold</Option>
                  <Option value="3">Rented</Option>
                </Select>
                <Select
                  label="Is lift available?"
                  onChange={(e) =>
                    setAddData({ ...addData, lift: e })}
                  className="text-black"
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
                <Select
                  label="Is parking available?"
                  onChange={(e) => setAddData({ ...addData, parking: e })}
                  className="text-black"
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
                <Input
                  label="Flooring"
                  value={addData.flooring}
                  onChange={(e) =>
                    setAddData({ ...addData, flooring: e.target.value })
                  }
                  required
                />
                <Input
                  type="number"
                  value={addData.price}
                  onChange={(e) =>
                    setAddData({ ...addData, price: e.target.value })
                  }
                  min={0}
                  label="Price"
                  required
                />
                <Input
                  type="number"
                  value={addData.deposit}
                  onChange={(e) =>
                    setAddData({ ...addData, deposit: e.target.value })
                  }
                  min={0}
                  label="Deposit"
                  required
                />
                <Select
                  label="Are you Pay on month?"
                  onChange={(e) => setAddData({ ...addData, pay_on_month: e })}
                  className="text-black"
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
                <Select
                  label="Select a category"
                  onChange={(e) => {
                    fetchSubCategoryData(e);
                    setAddData({ ...addData, category: e });
                  }}
                  className="text-black"
                >
                  {categoryData.map((category, i) => (
                    <Option key={i} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>

                {subCategoryData && subCategoryData.subCategories?.length > 0 && (
                  <Select
                    label="Select a sub-category"
                    onChange={(e) => setAddData({ ...addData, subcategory: e })}
                    className="text-black"
                  >
                    {subCategoryData.subCategories?.map((sub_category, i) => (
                      <Option key={i} value={sub_category._id}>
                        {sub_category.name}
                      </Option>
                    ))}
                  </Select>
                )}

                <Input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  label="Image"
                  onChange={handleImageChange}
                  multiple
                  required
                />

                <Textarea
                  label="Description"
                  value={addData.description}
                  onChange={(e) =>
                    setAddData({ ...addData, description: e.target.value })
                  }
                  required
                />
              </div>

              {/* Preview of the first image */}
              {previewUrl && (
                <div className="flex gap-2 mt-2">
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Selected"
                      className="w-28 h-28 object-cover rounded-lg"
                    />
                    <HiOutlineXMark
                      className="bg-red-600 text-white rounded-full absolute -top-2 -right-2 cursor-pointer"
                      onClick={() => handleDeleteImage(0)}
                    />
                  </div>
                </div>
              )}

              {previewUrls.length > 1 && (
                <div className="flex gap-2 mt-2">
                  {previewUrls.slice(1).map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt="Selected"
                        className="w-28 h-28 object-cover rounded-lg"
                      />
                      <HiOutlineXMark
                        className="bg-red-600 text-white rounded-full absolute -top-2 -right-2 cursor-pointer"
                        onClick={() => handleDeleteImage(index + 1)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end mt-4">
                {loading ? (
                  <Button className="cursor-not-allowed" disabled>
                    Loading...
                  </Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </div>
            </form>
          </div>
        )}

        {location.update_property && (
          <div className="container mx-auto px-4 mb-10 mt-3">
            <p className="text-4xl font-semibold mb-3">Update Property</p>

            <form onSubmit={handleUpdateProperty}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
                <Input
                  label="Property name"
                  value={updateData.property_name}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      property_name: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="City"
                  value={updateData.city}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, city: e.target.value })
                  }
                  required
                />
                <Input
                  label="Locality"
                  value={updateData.locality}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, locality: e.target.value })
                  }
                  required
                />
                <Input
                  label="Age"
                  type="number"
                  min={0}
                  value={updateData.age}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, age: e.target.value })
                  }
                  required
                />
                <Input
                  label="Flooring"
                  value={updateData.flooring}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, flooring: e.target.value })
                  }
                  required
                />
                <Input
                  label="Price"
                  type="number"
                  min={1}
                  value={updateData.price}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, price: e.target.value })
                  }
                  required
                />
                <Textarea
                  label="Description"
                  value={updateData.description}
                  onChange={(e) =>
                    setUpdateData({
                      ...updateData,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button type="submit">Update</Button>
              </div>
            </form>
          </div>
        )}
      </VendorNavbar>
    </div>
  );
}

export default VendorAddProperties;
