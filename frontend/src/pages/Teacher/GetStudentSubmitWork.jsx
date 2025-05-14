import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GetTeacherSubmitWorks() {
  const { id } = JSON.parse(localStorage.getItem('user'));
  const [submitWorks, setSubmitWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmitWorks = async () => {
      setLoading(true);
      setError(null);

      try {
        // Kurs ID’sini tekshirish
        if (!id || isNaN(id)) {
          throw new Error('Noto‘g‘ri kurs ID’si.');
        }

        // Tokenni localStorage dan olish
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Tizimga kirish talab qilinadi.');
        }

        // User ma'lumotlarini olish
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          throw new Error('Foydalanuvchi ma‘lumotlari topilmadi.');
        }

        // API so‘rovi (kurs ID’si bo‘yicha filtrlangan ishlarni olish)
        const res = await axios.get(`http://localhost:4000/teacher/student-work/45`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        

        // API javobini tekshirish
        if (res.data.message === 'Topshirilgan ismlar topilmadi' || !res.data.length) {
          setSubmitWorks([]);
        } else {
          setSubmitWorks(res.data);
        }
      } catch (err) {
        console.error('Xatolik:', err);
        setError(err.response?.data?.message || err.message || 'Topshirilgan ishlarni olishda xatolik yuz berdi.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmitWorks();
  }, [id]); // id o‘zgarganda qayta so‘rov yuborish

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Kurs bo‘yicha Topshirilgan Ishlar</h1>

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
          <button
            onClick={() => window.location.href = '/login'}
            className="mt-2 text-sm text-red-600 hover:underline"
          >
            Tizimga qayta kirish
          </button>
        </div>
      )}

      {!loading && !error && submitWorks.length === 0 && (
        <p className="text-gray-600 text-lg">Topshirilgan ishlar topilmadi.</p>
      )}

      <div className="w-full max-w-4xl space-y-4">
        {submitWorks.map((work) => (
          <div
            key={work.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800">{work.title}</h2>
            <p className="text-gray-600 mt-2">
              Fayl:{' '}
              <a
                href={work.filepath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Yuklab olish
              </a>
            </p>
            <p className="text-gray-600 mt-1">
              Baho: {work.grade ? work.grade : 'Baholanmagan'}
            </p>
            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>Talaba: {work.student_name || work.student_id}</span>
              <span>Topshiriq: {work.task_title || work.task_id}</span>
              <span>Kurs: {work.course_title || 'Noma‘lum'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GetTeacherSubmitWorks;