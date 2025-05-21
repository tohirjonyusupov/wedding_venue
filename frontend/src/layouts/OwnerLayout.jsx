import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function OwnerLayout() {
  return (
    <div className="flex">
      <Sidebar paths={['/', 'create-venue', 'my-venues']} panelName={'owner'}/>
      <main className="flex-1 sm:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default OwnerLayout;