import React from "react";
import Logo from "../assets/logo.svg";
import housy from "../assets/housy.jpg";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen text-white">
      <div className="h-24 bg-blue-100 flex justify-between items-center px-5">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="h-12" />
          <p className="text-2xl font-semibold text-blue-900">EazyEstate</p>
        </div>
        <div>
          <Link to="/login">
            <Button className="bg-teal-500 hover:bg-teal-600">Login</Button>
          </Link>
        </div>
      </div>

      <div className="md:grid grid-cols-2 justify-center items-center gap-5 py-10">
        <img src={housy} alt="house" className="w-full h-full object-cover rounded-lg shadow-lg" />
        <div className="flex flex-col justify-end gap-4 items-center md:items-end px-4">
          <p className="text-lg font-semibold border border-white px-4 rounded-full">
            For User
          </p>
          <p className="md:text-3xl lg:text-5xl xl:text-7xl font-bold text-center md:text-right">
            Welcome to EazyEstate! Your journey begins here
          </p>
          <Link to="/user_registration">
            <Button className="bg-teal-500 hover:bg-teal-600">Know more</Button>
          </Link>
        </div>
      </div>

      <div className="text-center flex flex-col gap-3 items-center mb-4 mt-4 md:mt-0 py-10">
        <p className="text-lg font-semibold border border-white px-4 rounded-full">
          For Vendor
        </p>
        <p className="text-2xl font-bold text-center">
          Welcome aboard, valued vendor! Together, let's shape excellence and redefine possibilities.
        </p>
        <Link to="/vendor_registration">
          <Button className="bg-teal-500 hover:bg-teal-600">Know more</Button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
