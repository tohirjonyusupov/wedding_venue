import React from 'react'

function SubmitButton({ label, disabled }) {
    return (
      <button
        type="submit"
        disabled={disabled}
        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {label}
      </button>
    );
  }
  
  export default SubmitButton;