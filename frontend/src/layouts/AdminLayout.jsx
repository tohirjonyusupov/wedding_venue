import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar paths={['/','add-venue', 'create-owner', 'venues', 'bookings']} panelName={'admin'}/>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
