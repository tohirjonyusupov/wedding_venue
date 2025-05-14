import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
const token = localStorage.getItem("token");

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

   useEffect(() => {
    fetchStudents();
  }, []);


  // Talabani o'chirish funksiyasi
  const handleDelete = async (id) => {
      try {
        if (!token) {
          throw new Error("Tizimga kirish talab qilinadi");
        }
  
        const response = await axios.delete(`http://localhost:4000/admin/delete-user/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
          fetchStudents()
        }
      } catch (err) {
        // Xato xabarini backenddan olish yoki umumiy xato
        const errorMessage = err.response?.data?.xabar || err.message || "O'chirishda xato yuz berdi";
      }
    
  };

  const handleEdit = (student) => {
    alert(`Talaba ID: ${student.student_id} uchun tahrirlash oynasi ochiladi`);
   };

  if (loading) {
    return <p className="text-center text-gray-500 mt-5">Yuklanmoqda...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Xato: {error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Foydalanuvchilar ro'yxati</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Ism</th>
            <th className="border px-4 py-2">Familiya</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {students?.users.map((student) => (
            student.role !== "admin" && (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.id}</td>
              <td className="border px-4 py-2">{student.firstname}</td>
              <td className="border px-4 py-2">{student.lastname}</td>
              <td className="border px-4 py-2">{student.role}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(student)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition focus:outline-none mx-4"
                  title="Tahrirlash"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition focus:outline-none"
                  title="O'chirish"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          )))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;