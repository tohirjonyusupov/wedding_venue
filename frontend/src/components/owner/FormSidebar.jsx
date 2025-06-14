import React from "react";
import { useVenueStore } from "../../zustand/VenueStore";

function FormSidebar() {
  const { activeSection, setActiveSection } = useVenueStore(
    (state) => state
  );
  return (
    <aside className="py-6 lg:col-span-3">
      <nav className="space-y-1">
        <button
          type="button"
          onClick={() => setActiveSection("basic")}
          className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium w-full ${
            activeSection === "basic"
              ? "bg-rose-50 text-rose-700"
              : "text-gray-900 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span className="truncate">Asosiy Ma'lumotlar</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("images")}
          className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium w-full ${
            activeSection === "images"
              ? "bg-rose-50 text-rose-700"
              : "text-gray-900 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span className="truncate">Suratlar</span>
        </button>
      </nav>
    </aside>
  );
}

export default FormSidebar;
