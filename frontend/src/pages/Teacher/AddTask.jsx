import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {id} = useParams();
  const token = localStorage.getItem("token");

     
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`http://localhost:4000/teacher/add-task`,{
        "title": title,
        "description": description,
        "course_id": id
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (result.status === 201) {
        document.querySelector(".success").classList.remove("hidden");
        document.getElementById("success-msg").textContent =
        result.data.message;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTitle('');
      setDescription('');
    }
  }

  


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-5">Add New Task</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <div
                className="p-4 my-4 text-green-800 rounded-lg bg-green-50 border border-green-300 hidden success"
                role="alert"
              >
                <span className="font-medium">Muvaffaqiyat!</span>{" "}
                <span id="success-msg"></span>
              </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTask;
