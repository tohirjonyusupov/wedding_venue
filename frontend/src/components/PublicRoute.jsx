import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PublicRoute = () => {
  const { isAuthenticated, role } = useAuth();

  if (isAuthenticated) {
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "teacher") return <Navigate to="/teacher" replace />;
    if (role === "student") return <Navigate to="/student" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
