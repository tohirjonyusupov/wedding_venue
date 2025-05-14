import React from 'react'

function InputField({ type, placeholder, value, onChange, required }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
  }
  
  export default InputField;