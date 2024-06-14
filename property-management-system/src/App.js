import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import VendorLayout from "./layouts/VendorLayout";
import UserLayout from "./layouts/UserLayout";
import VendorRegistration from "./auth/VendorRegistration";
import UserRegistration from "./auth/UserRegistration";
import LandingPage from "./layouts/LandingPage";
import AdminDashboard from "./views/admin/AdminDashboard";
import ManageVendor from "./views/admin/ManageVendor";
import VendorsList from "./views/admin/VendorsList";
import ManageCategories from "./views/admin/ManageCategories";
import ManageSubCategory from "./views/admin/ManageSubCategory";
import VendorDashboard from "./views/vendors/VendorDashboard";
import UserDashboard from "./views/users/UserDashboard";
import { Toaster } from "react-hot-toast";
import ListProperties from "./views/admin/ListProperties";
import UserManageCategories from "./views/users/UserManageCategories";
import UserManageSubCategories from "./views/users/UserManageSubCategories";
import UserListProperties from "./views/users/UserListProperties";
import UserPropertyDetails from "./views/users/UserPropertyDetails";
import UserWishlist from "./views/users/UserWishlist";
import UserBookings from "./views/users/UserBookings";
import VendorUserBookings from "./views/vendors/VendorUserBookings";
import VendorPropertyDetails from "./views/vendors/VendorPropertyDetails";
import VendorProperties from "./views/vendors/VendorProperties";
import VendorAddProperties from "./views/vendors/VendorAddProperties";
import AdminPropertyDetails from "./views/admin/AdminPropertyDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* authentication */}
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/vendor_registration"
            element={
              <AuthLayout>
                <VendorRegistration />
              </AuthLayout>
            }
          />
          <Route
            path="/user_registration"
            element={
              <AuthLayout>
                <UserRegistration />
              </AuthLayout>
            }
          />

          {/* landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Admin route */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/vendor_requests"
            element={
              <AdminLayout>
                <ManageVendor />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/vendors_list"
            element={
              <AdminLayout>
                <VendorsList />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/manage_categories"
            element={
              <AdminLayout>
                <ManageCategories />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/manage_sub_categories"
            element={
              <AdminLayout>
                <ManageSubCategory />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/vendor/list_properties"
            element={
              <AdminLayout>
                <ListProperties />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/vendor/property/details"
            element={
              <AdminLayout>
                <AdminPropertyDetails />
              </AdminLayout>
            }
          />

          <Route
            path="/vendor/dashboard"
            element={
              <VendorLayout>
                <VendorProperties />
              </VendorLayout>
            }
          />
          <Route
            path="/vendor/accept_bookings"
            element={
              <VendorLayout>
                <VendorUserBookings />
              </VendorLayout>
            }
          />
          <Route
            path="/vendor/property/details"
            element={
              <VendorLayout>
                <VendorPropertyDetails />
              </VendorLayout>
            }
          />
          <Route
            path="/vendor/property_list"
            element={
              <VendorLayout>
                <VendorProperties />
              </VendorLayout>
            }
          />
          <Route
            path="/vendor/manage_property"
            element={
              <VendorLayout>
                <VendorAddProperties />
              </VendorLayout>
            }
          />

          <Route
            path="/user/dashboard"
            element={
              <UserLayout>
                <UserDashboard />
              </UserLayout>
            }
          />
          <Route
            path="/user/manage_categories"
            element={
              <UserLayout>
                <UserManageCategories />
              </UserLayout>
            }
          />
          <Route
            path="/user/categories/manage_sub_categories"
            element={
              <UserLayout>
                <UserManageSubCategories />
              </UserLayout>
            }
          />
          <Route
            path="/user/categories/sub_categories/list_properties"
            element={
              <UserLayout>
                <UserListProperties />
              </UserLayout>
            }
          />
          <Route
            path="/user/property/details"
            element={
              <UserLayout>
                <UserPropertyDetails />
              </UserLayout>
            }
          />
          <Route
            path="/user/wishlist"
            element={
              <UserLayout>
                <UserWishlist />
              </UserLayout>
            }
          />
          <Route
            path="/user/my_bookings"
            element={
              <UserLayout>
                <UserBookings />
              </UserLayout>
            }
          />
        </Routes>
      </BrowserRouter>

      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
