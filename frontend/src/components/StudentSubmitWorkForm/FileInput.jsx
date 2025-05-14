import React from 'react'

function FileInput({ onChange, accept }) {
    return (
      <input
        type="file"
        onChange={onChange}
        accept={accept}
        required
        className="w-full p-2 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600"
      />
    );
  }
  
  export default FileInput;