import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound({activeTab}) {
  const navigate = useNavigate()
  return (
    <div className="mt-6 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        To'yxona topilmadi
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        {activeTab === "upcoming"
          ? "Sizda yaqin qlgan buyurtmalar mavjud emas."
          : activeTab === "past"
          ? "Sizda o'tgan buyurtmalar mavjud emas."
          : "Sizda bekor qilingan buyurtmalar mavjud emas."}
      </p>
      <div className="mt-6">
        <button
          className="inline-flex items-center rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          onClick={() => navigate("/venues")}
        >
          Buyurtma qilish
        </button>
      </div>
    </div>
  );
}

export default NotFound;
