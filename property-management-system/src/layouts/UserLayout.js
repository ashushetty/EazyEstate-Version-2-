import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserLayout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("property_user_access_token")) {
    //   navigate("/");
    // }
  }, []);

  return <div>{props.children}</div>;
}

export default UserLayout;
