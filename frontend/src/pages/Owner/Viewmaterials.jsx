import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Viewmaterials() {
  const [materials, setMaterials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  console.log(id);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const getMaterials = async () => {
      if (!token) {
        setError("Token topilmadi. Iltimos, tizimga kirishni tekshiring.");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:4000/student/get-course-materials/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API ma'lumoti", res.data);

        if (!Array.isArray(res.data) || res.data.length === 0) {
          setError("Kursga tegishli materiallar topilmadi.");
          toast.error("Kursga tegishli materiallar topilmadi.");
        } else {
          setMaterials(res.data);
          toast.success("Materiallar muvaffaqiyatli yuklandi!");
        }
      } catch (err) {
        console.error("Xatolik:", err);
        setError(
          "Materiallarni olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
        );
        toast.error("Materiallarni olishda xatolik yuz berdi.");
      } finally {
        setLoading(false);
      }
    };

    getMaterials();
  }, [id, token, navigate]);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  // if (error) {
  //   return <div className="text-red-500">{error}</div>;
  // }

  return (
    <div>
      {materials?.length > 0 ? (
        materials.map((material, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold">{material.title}</h2>
            <p className="text-gray-700">{material.description}</p>
            <a
              href={`http://localhost:4000${material.filepath}`}
              className="text-blue-500 hover:underline"
              download
            >
              Yuklab olish
            </a>
            
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500">
          Materiallar mavjud emas.
        </div>
      )}
      <Link
        to={`/student/task/${id}`}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >Tasks</Link>
    </div>
  );
}

export default Viewmaterials;
