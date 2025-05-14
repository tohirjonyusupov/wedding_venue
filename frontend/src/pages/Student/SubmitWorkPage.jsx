import React from 'react'

import { useParams } from 'react-router-dom';
import SubmitWorkForm from '../../components/StudentSubmitWorkForm/SubmitWorkForm';

function SubmitWorkPage() {
  const { taskId } = useParams();
  const {id} = JSON.parse(localStorage.getItem('user'))  
  
  


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">
      </h1>
      <SubmitWorkForm taskId={taskId} studentId={ id} />
    </div>
  );
}

export default SubmitWorkPage;