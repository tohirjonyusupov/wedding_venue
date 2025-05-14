
import React from "react";

import {useNavigate, useParams} from 'react-router-dom'
import { useState } from "react";
import axios from "axios";
import {
  FileTextIcon,
  FileVideoIcon,
  FileSpreadsheetIcon,
  FileArchiveIcon,
  MoreHorizontalIcon,
  DownloadIcon,
  PencilIcon,
  TrashIcon,
  UploadIcon,
  XIcon,
  FileExcelIcon,
  FilePptIcon,
} from "./Icons"; // Siz o'zingizning ikonlaringizni import qilishingiz mumkin

function AddMaterials() {
  const [activeTab, setActiveTab] = useState("add");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [materials, setMaterials] = useState([]);
  const {course_id} = useParams()
  const navigate = useNavigate()
  
  const token =
    localStorage.getItem("token");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("course_id", course_id);

    const addMaterial = async () => {
      try {
        const response = await axios.post(
          `http://localhost:4000/teacher/add-materials`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response) {
          document.querySelector(".success").classList.remove("hidden");
          document.getElementById("success-msg").textContent =
            response.data.message;
          fetchMaterials();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTitle("");
        setFile(null);
      }
    };

    if (!title && !file) {
      document.querySelector(".info").classList.remove("hidden");
      document.getElementById("info-msg").textContent =
        "Iltimos, barcha maydonlarni to‘liq to‘ldiring.";
      return;
    } else if (!title) {
      document.querySelector(".info").classList.remove("hidden");
      document.getElementById("info-msg").textContent =
        "Iltimos, material nomini kiriting.";
      return;
    } else if (!file) {
      document.querySelector(".info").classList.remove("hidden");
      document.getElementById("info-msg").textContent =
        "Iltimos, faylni tanlang.";
      return;
    }
    addMaterial();
  };

  const removeFile = () => {
    setFile(null);
  };

  // Helper function to get the appropriate icon based on file format
  const getFileIcon = (format) => {
    switch (format.toLowerCase()) {
      case "pdf":
      case "doc":
      case "docx":
        return <FileTextIcon className="h-5 w-5" />;
      case "ppt":
      case "pptx":
        return <FilePptIcon className="h-5 w-5" />;
      case "mp4":
        return <FileVideoIcon className="h-5 w-5" />;
      case "xls":
      case "xlsx":
        return <FileExcelIcon className="h-5 w-5" />;
      case "zip":
      case "rar":
        return <FileArchiveIcon className="h-5 w-5" />;
      default:
        return <FileTextIcon className="h-5 w-5" />;
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/teacher/get-all-materials`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setMaterials(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Kurs Materiallari</h1>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "add"
                ? "border-b-3 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("add")}
          >
            Material Qo'shish
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "list"
                ? "border-b-3 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => {
              setActiveTab("list");
              fetchMaterials();
            }}
          >
            Barcha Materiallar
          </button>
        </div>
      </div>

      {/* Add Material Form */}
      {activeTab === "add" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Yangi Material Qo'shish</h2>
            <p className="text-gray-500">
              Kurs uchun yangi o'quv materialini qo'shing
            </p>
          </div>

          <form className="space-y-6 " onSubmit={handleSubmit}>
            <div className="w-full">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Material Nomi
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Material nomini kiriting"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material Fayli
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${
                  file ? "border-green-300 bg-green-50" : "border-gray-300"
                }`}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer w-full text-center"
                >
                  {!file ? (
                    <div className="flex flex-col items-center gap-2">
                      <UploadIcon className="h-8 w-8 text-gray-400" />
                      <p className="text-sm font-medium">
                        Faylni tanlash uchun bosing yoki bu yerga tashlang
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, ZIP, RAR (max
                        50MB)
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-between w-full">
                        <p className="text-sm font-medium truncate max-w-[80%]">
                          {file.name}
                        </p>
                        <button
                          className="p-1 rounded-full hover:bg-gray-200"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile();
                          }}
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
              <div
                className="p-4 my-4 text-green-800 rounded-lg bg-green-50 border border-green-300 hidden success"
                role="alert"
              >
                <span className="font-medium">Muvaffaqiyat!</span>{" "}
                <span id="success-msg"></span>
              </div>

              <div
                className="p-4 my-4 text-red-800 rounded-lg bg-red-50 border border-red-300 hidden error"
                role="alert"
              >
                <span className="font-medium">Xatolik!</span>{" "}
                <span id="error-msg"></span>
              </div>

              <div
                className="p-4 my-4 text-blue-800 bg-blue-50 border border-blue-300 rounded-lg hidden info"
                role="alert"
              >
                <span className="font-medium">Eslatma!</span>{" "}
                <span id="info-msg"></span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full md:w-auto"
            >
              Material Qo'shish
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full md:w-auto ms-4"
              onClick={() => (navigate(`/teacher/single-course/${course_id}`))}
            >
              Kursga qaytish
            </button>
          </form>
        </div>
      )}

      {/* Materials List */}

      {activeTab === "list" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-1">Barcha Materiallar</h2>
            <p className="text-gray-500">Barcha kurs materiallari ro'yxati</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              {materials.length > 0
                ? materials.map((material) => (
                    <div
                      key={material.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3 md:mb-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                          {getFileIcon(material.format)}
                        </div>
                        <div>
                          <h3 className="font-medium">{material.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
                            <span>{material.title}</span>
                          </div>
                        </div>
                      </div>

                      {/* <div className="flex items-center gap-3 w-full md:w-auto">
                      <div className="relative group">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden group-hover:block z-10">
                          <div className="py-1">
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              <span>Yuklab olish</span>
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <PencilIcon className="mr-2 h-4 w-4" />
                              <span>Tahrirlash</span>
                            </button>
                            <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                              <TrashIcon className="mr-2 h-4 w-4" />
                              <span>O'chirish</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    </div>
                  ))
                : (materials.length === 0 && (
                    <div className="flex items-center justify-center py-10">
                      <p className="text-gray-500">
                        Hozircha material mavjud emas.
                      </p>
                    </div>
                  ),
                  (
                    <div className="flex items-center justify-center min-h-[100px]">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddMaterials;
