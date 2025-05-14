import React, { useState } from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import Message from './Message';

function CourseForm() {
  const [courseName, setCourseName] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!courseName || !username) {
      setMessage('Please fill in all fields');
      setIsError(true);
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Adjust based on your auth setup
      const response = await fetch('http://localhost:4000/admin/create-course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }), // Include token if required
        },
        body: JSON.stringify({
          name: courseName.trim(),
          username: username.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setCourseName('');
        setUsername('');
      } else {
        setMessage(data.error || data.message || 'Failed to create course');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
      setIsError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <InputField
        type="text"
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        required
      />
      <InputField
        type="text"
        placeholder="Teacher Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <SubmitButton label="Create Course" />
      {message && <Message text={message} isError={isError} />}
    </form>
  );
}

export default CourseForm;