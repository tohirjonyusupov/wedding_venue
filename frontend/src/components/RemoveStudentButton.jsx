import React from 'react';
import axios from 'axios';

function RemoveStudentButton(props) {
  const { studentId, courseId, onStudentRemoved } = props;

  const handleRemove = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/teacher/remove-student', {
        studentId: studentId,
        courseId: courseId,
      });

      alert(response.data.message);

      // Если функция обновления есть, вызываем её
      if (onStudentRemoved) {
        onStudentRemoved(studentId);
      }
    } catch (error) {
      // Показываем сообщение об ошибке
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('Error: could not remove student from course');
      }
    }
  };

  return (
    <button
      onClick={handleRemove}
      style={{
        backgroundColor: 'red',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      Remove from Course
    </button>
  );
}

export default RemoveStudentButton;
