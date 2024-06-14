import React from "react";

function AuthLayout(props) {
  return <div className="flex justify-center items-center h-screen bg-blue-gray-50">{props.children}</div>;
}

export default AuthLayout;
