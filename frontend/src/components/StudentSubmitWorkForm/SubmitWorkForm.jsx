import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import FileInput from './FileInput';
import SubmitButton from './SubmitButton';
import Message from './Message';

function SubmitWorkForm({ taskId, studentId }) {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [grade] = useState(0);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    console.log('Submitting work...');
    console.log('task_id', +taskId);
    console.log('studentId', studentId);
    console.log('title', title);
    console.log('file', file);

    if (!title || !file) {
      console.warn('Missing title or file');
      setMessage('Please provide a title and select a file');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      console.warn('File type not allowed:', file.type);
      setMessage('Only PNG, JPEG, WEBP, PDF, DOC, DOCX, XLS, XLSX, PPT, or PPTX files are allowed');
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('file', file);
    formData.append('grade', grade);
    formData.append('taskId', taskId);
    formData.append('studentId', studentId);

    try {
      const token = localStorage.getItem('token');
      console.log('Sending request to server...');

      const response = await axios.post(
        `http://localhost:4000/student/submit`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log('Server response:', response.data);

      setMessage('Work submitted successfully');
      setTitle('');
      setFile(null);
      e.target.reset();
    } catch (error) {
      console.error('Submit failed:', error);
      console.error('Error response:', error.response);
      setMessage(error.response?.data?.message || 'Failed to submit work');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <InputField
        type="text"
        placeholder="Work Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <FileInput
        onChange={(e) => setFile(e.target.files[0])}
        accept=".png,.jpeg,.jpg,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
      />
      <SubmitButton
        label={isLoading ? 'Submitting...' : 'Submit Work'}
        disabled={isLoading}
      />
      {message && <Message text={message} isError={isError} />}
    </form>
  );
}

export default SubmitWorkForm;
