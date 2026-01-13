import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");

  if (!token || userEmail !== "pshoaib215@gmail.com") {
    return <Navigate to="/" replace />; // Redirect to home if not authorized
  }

  return children;
};

export default PrivateRoute;