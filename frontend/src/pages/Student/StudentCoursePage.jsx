import axios from 'axios';
import React, { useEffect, useState } from 'react';
import StudentCourseCard from '../../components/StudentCourseCard/StudentCourseCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentCoursePage() {
    const [joinCourses, setJoinCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // student_id ni xavfsiz olish
    let studentId = null;
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        studentId = user?.id;
    } catch (err) {
        console.error('localStorage user xatosi:', err);
    }


    // Kursga qo‘shilish funksiyasi
    const handleJoinCourse = async (courseId) => {
        try {
            setError(null); // Oldingi xatolarni tozalash
    
            // Token tekshiruvi
            if (!token) {
                setError('Tizimga kirilmagan. Iltimos, login qiling.');
                navigate('/login');
                return;
            }
    
            // studentId tekshiruvi
            if (!studentId) {
                const profileRes = await axios.get('http://localhost:4000/user-profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                studentId = profileRes.data.student_id || profileRes.data.id;
                if (!studentId) {
                    throw new Error('Talaba ID topilmadi.');
                }
            }
    
            // Kursga qo‘shilish uchun POST so‘rov
            const response = await axios.post(
                'http://localhost:4000/student/join',
                {
                    student_id: studentId,
                    course_id: courseId,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            console.log('Kursga qo‘shilish javobi:', response.data);
    
            // Agar kursga allaqachon qo‘shilgan bo‘lsa, alert ko‘rsatish
            if (response.status === 400) {
                alert('Siz allaqachon ushbu kursga qo‘shilgansiz');
            } else {
                // Muvaffaqiyat xabari
                toast.success('Kursga muvaffaqiyatli yozildingiz!', {
                    position: 'top-right',
                    autoClose: 3000,
                });
    
                // my-course sahifasiga o‘tish
                navigate('/student/my-course');
            }
    
        } catch (error) {
            console.error('Kursga qo‘shilishda xato:', error);
            const errorMsg = error.response?.data?.message || 'Kursga qo‘shilishda xato yuz berdi.';
            setError(errorMsg);
            toast.error(errorMsg, {
                position: 'top-right',
                autoClose: 3000,
            });
        }
    };
    
    // Barcha kurslarni olish
    const getCourses = async () => {
        try {
            setLoading(true);
            if (!token) {
                setError('Tizimga kirilmagan. Iltimos, login qiling.');
                navigate('/login');
                return;
            }

            const res = await axios.get('http://localhost:4000/student/view-all-courses', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
                        
            setJoinCourses(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCourses();
    }, []);

    // Yuklanish holati
    if (loading) {
        return <div className="text-center mt-10 text-xl font-medium">Kurslar yuklanmoqda...</div>;
    }

    // Xato holati
    if (error) {
        return <div className="text-center mt-10 text-red-500 text-xl">{error}</div>;
    }

    // Kurslar bo‘sh bo‘lsa
    if (!joinCourses.length) {
        return <div className="text-center mt-10 text-xl font-medium">Hozirda kurslar mavjud emas.</div>;
    }

    // Kurslar ro‘yxati
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Barcha Kurslar</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {joinCourses.map((joinCourse) => (
                    <StudentCourseCard
                        key={joinCourse.id}
                        name={joinCourse.name}
                        teacher={joinCourse.teacher}
                        courseId={joinCourse.id}
                        handleJoinCourse={() => handleJoinCourse(joinCourse.id)}  
                    />
                ))}
            </div>
        </div>
    );
}

export default StudentCoursePage;