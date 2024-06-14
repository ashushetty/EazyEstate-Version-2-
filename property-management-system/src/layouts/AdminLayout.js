import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLayout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("property_admin_access_token")) {
      navigate("/");
    }
  }, []);

  return <div>{props.children}</div>;
}

export default AdminLayout;
