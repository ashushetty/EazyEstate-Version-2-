import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VendorLayout(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("property_vendor_access_token")) {
      navigate("/");
    }
  }, []);

  return <div>{props.children}</div>;
}

export default VendorLayout;
