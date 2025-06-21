// components/ViewToggle.jsx
import { Grid2X2, List } from "lucide-react";
import React from "react";

export default function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="flex border rounded-md">
      <button
        onClick={() => setViewMode("grid")}
        className={`p-2 rounded-md cursor-pointer transition ${
          viewMode === "grid"
            ? "bg-rose-50 text-rose-600"
            : "bg-white text-gray-500 hover:text-gray-700"
        }`}
        title="Grid view"
      >
        <Grid2X2 className="w-5 h-5" />
      </button>
      <button
        onClick={() => setViewMode("list")}
        className={`p-2 rounded-md cursor-pointer transition ${
          viewMode === "list"
            ? "bg-rose-50 text-rose-600"
            : "bg-white text-gray-500 hover:text-gray-700"
        }`}
        title="List view"
      >
        <List className="w-6 h-6" />
      </button>
    </div>
  );
}
