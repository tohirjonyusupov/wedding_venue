import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SingleCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // const [course, setCourse] = useState({})
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const studentRes = await axios.get(
          `http://localhost:4000/teacher/get-course-students/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(studentRes.data.data);
        console.log(studentRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const removeStudent = (enrollment_id) => {
    axios
      .delete(`http://localhost:4000/teacher/remove-student/${enrollment_id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setStudents(
          students.filter((student) => student.enrollment_id !== enrollment_id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading)
    return <div className="text-center py-6 text-blue-500">Yuklanmoqda...</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* <h1 className="text-3xl font-bold mb-6 text-indigo-700">{course?.name}</h1> */}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Enrolled Students:
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/teacher/add-task/${id}`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Add Task
          </button>
          <button
            onClick={() => navigate(`/teacher/add-materials/${id}`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            Add Material
          </button>
          <button
            onClick={() => {
              if (!id || isNaN(id)) {
                console.error("Noto‘g‘ri kurs ID’si:", id);
                return;
              }
              console.log("Navigating to course ID:", id);
              navigate(`/teacher/getstudentwork/${id}`);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            View Student Work
          </button>
        </div>
      </div>

      {students.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="w-5 px-4 py-3 text-center text-sm font-semibold text-indigo-700 tracking-wider border-r border-gray-200">
                  #
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider border-r border-gray-200">
                  Ism
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider border-r border-gray-200">
                  Familiya
                </th>
                <th
                  className="px-6 py-3 text-left text-sm font-semibold text-indigo-700 uppercase tracking-wider"
                  colSpan={2}
                >
                  Username
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {students.map((student, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors"
                >
                  <th className="w-5 px-4 py-3 text-center text-sm font-semibold text-indigo-700 tracking-wider border-r border-gray-200">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-100">
                    {student.firstname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 border-r border-gray-100">
                    {student.lastname}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {student.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all cursor-pointer"
                      onClick={() => removeStudent(student.enrollment_id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="italic text-gray-500">
          Bu kursga hali hech qanday student qo‘shilmagan.
        </p>
      )}
    </div>
  );
}

export default SingleCourse;
