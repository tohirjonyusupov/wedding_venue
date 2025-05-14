import React from 'react'

function Message({ text, isError }) {
    return (
      <div
        className={`p-3 rounded-md text-center ${
          isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}
      >
        {text}
      </div>
    );
  }
  
  export default Message;