import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewAllTeachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/admin/teachers', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                setTeachers(response.data.teachers);
            } catch (err) {
                console.log(err);
                setError('O‘qituvchilarni yuklashda xatolik yuz berdi!');
            } finally {
                setLoading(false);
            }
        };

        fetchTeachers();
    }, []);

    if (loading) return <p>Yuklanmoqda...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <h2 className="text-3xl font-semibold text-center text-gradient bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mb-6">
                    O‘qituvchilar ro‘yxati
                </h2>
                {teachers.length === 0 ? (
                    <p className="text-center text-gray-500">O‘qituvchilar mavjud emas.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left border-collapse">
                            <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 border-b border-gray-300 font-medium">ID</th>
                                    <th className="px-4 py-3 border-b border-gray-300 font-medium">Ismi</th>
                                    <th className="px-4 py-3 border-b border-gray-300 font-medium">Familiyasi</th>
                                    <th className="px-4 py-3 border-b border-gray-300 font-medium">Username</th>
                                    <th className="px-4 py-3 border-b border-gray-300 font-medium">Role</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {teachers.map((teacher, index) => (
                                    <tr
                                        key={teacher.id}
                                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition'}
                                    >
                                        <td className="px-4 py-3">{teacher.id}</td>
                                        <td className="px-4 py-3">{teacher.firstname}</td>
                                        <td className="px-4 py-3">{teacher.lastname}</td>
                                        <td className="px-4 py-3">{teacher.username}</td>
                                        <td className="px-4 py-3 capitalize">{teacher.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>

    );
};

export default ViewAllTeachers;
