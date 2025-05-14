import React from "react";
import '../../pages/Admin/CreateCourse.css'
import CourseForm from "../../components/CourseForm/CourseForm";
function CreateCourse() {
  return (
    <div className="container">
      <h1>Add a New Course</h1>
      <CourseForm />
    </div>
  );
}

export default CreateCourse;
