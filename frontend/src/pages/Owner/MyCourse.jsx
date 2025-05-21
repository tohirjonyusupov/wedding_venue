import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../../components/CourseCard/CourseCard';

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        if (!token || !user) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `http://localhost:4000/student/my-course/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCourses(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Kurslarni yuklashda xato');
        console.error('Xatolik:', err);
        
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [ ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Xatolik! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-gray-600">Siz hali hech qanday kursga yozilmagansiz</h3>
        <button 
          onClick={() => navigate('/courses')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Kurslarga Yozilish
        </button>
      </div>
    );
  }

 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Mening Kurslarim</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          console.log(course),
          <CourseCard
            key={course.course_id}

            course={course}
            onView={() => navigate(`/student/my-course/course/${course.course_id}`)} 
            // yoki course.course_id
            />
          ))}
          
      </div>
    </div>
    );
  };


export default MyCourse;