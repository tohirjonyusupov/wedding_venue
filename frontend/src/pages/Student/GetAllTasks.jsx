import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function GetAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Kurs ID sini statik sifatida 9 qilib o‘rnatamiz
  const {courseId} = useParams();
  console.log(courseId);
  
  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        // Tokenni localStorage dan olish
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token topilmadi. Tizimga kiring.');
        }

        // User ma'lumotlarini olish
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          throw new Error('Foydalanuvchi ma‘lumotlari topilmadi.');
        }

        // API so‘rovi
        const res = await axios.get(
          `http://localhost:4000/student/courses/${courseId}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res);
        setTasks(res.data);
      } catch (err) {
        console.error('Xatolik:', err);
        setError(err.response?.data?.message || err.message || 'Topshiriqlarni olishda xatolik yuz berdi.');
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []); // courseId statik bo‘lgani uchun dependensiya ro‘yxati bo‘sh

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Kurs Topshiriqlari</h1>

      {loading && (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 w-full max-w-2xl">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && tasks.length === 0 && (
        <p className="text-gray-600 text-lg">Topshiriqlar topilmadi.</p>
      )}

      <div className="w-full max-w-2xl space-y-4">
        
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
            <p className="text-gray-600 mt-2">{task.description}</p>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Topshiriq ID: {task.id}</span>
              <span>Kurs ID: {task.course_id}</span>
              <button>
              <Link to={`/student/submit/${task.id}`}>Upload Work</Link>
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetAllTasks;