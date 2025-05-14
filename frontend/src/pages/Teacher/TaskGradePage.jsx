import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentWorkPage = () => {
  const { id } = useParams();  
  const [work, setWork] = useState(null);
  const [grade, setGrade] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

   
  useEffect(() => {
    const fetchWork = async () => {
      try {
         
        const response = await axios.get(`http://localhost:4000/teacher/${id}`);
        setWork(response.data.studentWork);
      } catch (err) {
        setError("Failed to load student work.");
      }
    };
    fetchWork();
  }, [id]);

 
  const handleGradeSubmit = async () => {
    if (!grade || grade < 0 || grade > 5) {
      setError("Grade must be between 0 and 5.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/teacher/${id}/grade`,
        { grade },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,  
          },
        }
      );
      setSuccess(response.data.message);
      setWork(response.data.studentWork);  
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit grade.");
      setSuccess("");
    }
  };

  if (!work) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Student Work</h2>
      <div>
        <p><strong>Task ID:</strong> {work.task_id}</p>
        <p><strong>Student Work ID:</strong> {work.id}</p>
        <p><strong>Current Grade:</strong> {work.grade ?? "Not graded"}</p>
      </div>

      <div>
        <h3>Grade Work</h3>
        <input
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Enter grade (0-5)"
          min="0"
          max="5"
        />
        <button onClick={handleGradeSubmit}>Submit Grade</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default StudentWorkPage;