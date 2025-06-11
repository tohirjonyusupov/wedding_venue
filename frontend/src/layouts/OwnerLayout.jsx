import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function OwnerLayout() {
  return (
    <div className="flex">
      <Sidebar paths={['/', 'add-venue', 'venues', 'bookings']} panelName={'owner'}/>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default OwnerLayout;