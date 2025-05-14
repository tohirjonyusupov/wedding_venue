import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewAllCourses() {
    const { id } = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token')

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/teacher/${id}/courses`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourses(response.data.data);
                console.log(response);
                setMessage(response.data.message);
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === 404) {
                    setMessage('Kurslar topilmadi');
                } else {
                    setMessage('Kurslarni olishda xatolik yuz berdi');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div className="text-center text-xl font-semibold py-6 animate-pulse text-blue-500">Yuklanmoqda...</div>;
    }

    return (
        <div className="text-center  max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">O'qituvchining Kurslari</h2>
            {/* <p className="text-center text-gray-600 mb-8 italic">{message}</p> */}

            {courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <Link key={course.id} to={`/teacher/single-course/${course.id}`}>
                            <div
                                className="bg-gradient-to-r from-white to-blue-50 border border-blue-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">{course.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="text-center text-red-500 text-lg">Hech qanday kurs topilmadi.</p>
            )}
        </div>
    );
}

export default ViewAllCourses;
