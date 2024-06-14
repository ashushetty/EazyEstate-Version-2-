import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { mailPattern, phoneNumber, strongPwd } from "../variables/constants";
import toast from "react-hot-toast";
import { postServices } from "../apiServices/apiServices";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [isValid, setIsValid] = useState({ username: false, password: false });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "username") {
      if (
        mailPattern.test(e.target.value) ||
        phoneNumber.test(e.target.value)
      ) {
        setIsValid({ ...isValid, username: true });
      } else {
        setIsValid({ ...isValid, username: false });
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

    if (!isValid.username) {
      alert("Please enter correct Phone number/Email address");
    } else if (!isValid.password) {
      alert(
        "The password must be at least 6 characters long and must include at least one uppercase character, one number and one special character"
      );
    } else {
      try {
        const res = await postServices(`/api/account/signin`, data);
        if (res.responseCode === 200) {
          if (res.responseData.role === 1) {
            localStorage.setItem(
              "property_admin_access_token",
              res.responseData.access_token
            );
            navigate("/admin/dashboard");
          } else if (res.responseData.role === 2) {
            localStorage.setItem(
              "property_vendor_access_token",
              res.responseData.access_token
            );
            navigate("/vendor/dashboard");
          } else if (res.responseData.role === 3) {
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
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <form onSubmit={handleSubmit}>
          <CardHeader
            className="mb-4 grid h-28 place-items-center bg-gradient-to-r from-blue-500 to-teal-400"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              name="username"
              label="Email/Phone number"
              type="text"
              size="lg"
              onChange={handleChange}
              required
              className="bg-white"
            />
            <Input
              name="password"
              label="Password"
              type="password"
              size="lg"
              onChange={handleChange}
              required
              className="bg-white"
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white"
            >
              Sign In
            </Button>
            {/* <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                className="ml-1 font-bold text-blue-500"
              >
                Sign up
              </Typography>
            </Typography> */}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
