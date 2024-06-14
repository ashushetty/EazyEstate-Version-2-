import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mailPattern, phoneNumber, strongPwd } from "../variables/constants";
import toast from "react-hot-toast";
import { postServices } from "../apiServices/apiServices";

function UserRegistration() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
    phone: false,
    password: false,
    confirm_password: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "email") {
      if (mailPattern.test(e.target.value)) {
        setIsValid({ ...isValid, email: true });
      } else {
        setIsValid({ ...isValid, email: false });
      }
    } else if (e.target.name === "phone") {
      if (phoneNumber.test(e.target.value)) {
        setIsValid({ ...isValid, phone: true });
      } else {
        setIsValid({ ...isValid, phone: false });
      }
    } else if (e.target.name === "password") {
      if (strongPwd.test(e.target.value)) {
        setIsValid({ ...isValid, password: true });
      } else {
        setIsValid({ ...isValid, password: false });
      }
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid.email) {
      toast.error("Please enter the valid email address");
    } else if (!isValid.phone) {
      toast.error("Please enter the valid phone number");
    } else if (!isValid.password) {
      toast.error(
        "The password must be at least 6 characters long and must include at least one uppercase character, one number and one special character"
      );
    } else if (data.password !== data.confirm_password) {
      toast.error("Password and confirm password should match");
    } else {
      try {
        const res = await postServices(`/api/account/signup`, {
          name: data.name,
          role: "3",
          email: data.email,
          phone: "+91" + data.phone,
          password: data.password,
          cnfrm_pwd: data.confirm_password,
        });
        if (res.responseCode === 200) {
          if (res.responseData.role === 3) {
            localStorage.setItem(
              "property_user_access_token",
              res.responseData.access_token
            );
            navigate("/user/dashboard");
          }
        } else {
          toast.error(res.responseMessage);
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <form onSubmit={handleSubmit}>
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center bg-gradient-to-r from-blue-500 to-teal-400"
          >
            <Typography variant="h3" color="white">
              User Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              name="name"
              label="Name"
              type="text"
              size="lg"
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              label="Email"
              type="email"
              size="lg"
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              label="Phone Number"
              type="tel"
              size="lg"
              onChange={handleChange}
              required
              maxLength={10}
            />
            <Input
              name="password"
              label="Create Password"
              type="password"
              size="lg"
              onChange={handleChange}
              required
            />
            <Input
              name="confirm_password"
              label="Confirm Password"
              type="password"
              size="lg"
              onChange={handleChange}
              required
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              variant="gradient"
              fullWidth
              className="bg-gradient-to-r from-blue-500 to-teal-400"
            >
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center text-gray-700">
              Already have an account?
              <Link to={"/login"} className="ml-1 font-bold text-blue-500">
                Sign in
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default UserRegistration;
