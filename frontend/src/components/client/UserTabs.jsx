import React from "react";

function UserTabs({ activeTab, setActiveTab }) {
  return (
    <div className="border-t border-gray-200">
      <div className="flex">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-center text-sm font-medium ${
            activeTab === "upcoming"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          Yaqin qolgan buyurtmalar
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-center text-sm font-medium ${
            activeTab === "past"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          O'tgan buyurtmalar
        </button>
        <button
          onClick={() => setActiveTab("cancelled")}
          className={`flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-center text-sm font-medium ${
            activeTab === "cancelled"
              ? "border-rose-500 text-rose-600"
              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          Bekor qilingan buyurtmalar
        </button>
      </div>
    </div>
  );
}

export default UserTabs;
