/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { axios } from "axios";
import { useParams } from "react-router-dom";

const SubmitWork = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const { taskId } = useParams();

  const handleSubmit = async (e) => {
    if (!title || !file) {
      setMessage("Please fill in all required fields.");
      return;
    }

    const formData = new formData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      await axios.put(
        `http://localhost/4000/student/submit/${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Task submitted successfully!");
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Submission failed.");
    }
  };

  return (
    <div className="align-middle p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Submit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full px-3 py-2"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
        {message && <p className="text-sm text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default SubmitWork;
